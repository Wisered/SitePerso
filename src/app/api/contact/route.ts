import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Configuration DOMPurify pour l'environnement serveur Node.js
const window = new JSDOM('').window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const purify = DOMPurify(window as any);

// Rate limiting simple en mémoire
interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Configuration du rate limiting (modifiable facilement)
const RATE_LIMIT_CONFIG = {
  maxRequests: 2,        // 3 messages maximum
  windowMinutes: 60,     // par fenêtre de 60 minutes
  cleanupInterval: 3600000 // nettoyage toutes les heures (en ms)
};

// Nettoyage automatique des anciennes entrées
setInterval(() => {
  const now = Date.now();
  const windowMs = RATE_LIMIT_CONFIG.windowMinutes * 60 * 1000;
  
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.lastRequest > windowMs) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_CONFIG.cleanupInterval);

function getClientIP(request: NextRequest): string {
  // Essaye plusieurs headers pour récupérer l'IP réelle
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback vers une valeur par défaut
  return 'localhost';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowMs = RATE_LIMIT_CONFIG.windowMinutes * 60 * 1000;
  
  const entry = rateLimitMap.get(ip);
  
  if (!entry) {
    // Première requête pour cette IP
    rateLimitMap.set(ip, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime: now + windowMs
    };
  }
  
  // Vérifie si la fenêtre de temps a expiré
  if (now - entry.firstRequest > windowMs) {
    // Reset du compteur
    rateLimitMap.set(ip, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime: now + windowMs
    };
  }
  
  // Increment du compteur
  entry.count++;
  entry.lastRequest = now;
  
  const allowed = entry.count <= RATE_LIMIT_CONFIG.maxRequests;
  const remaining = Math.max(0, RATE_LIMIT_CONFIG.maxRequests - entry.count);
  const resetTime = entry.firstRequest + windowMs;
  
  return { allowed, remaining, resetTime };
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Vérification du rate limiting AVANT tout traitement
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime);
      return NextResponse.json(
        { 
          error: `Limite d'envoi atteinte. Veuillez attendre avant de renvoyer un message.`,
          resetTime: resetTime.toISOString(),
          remaining: rateLimitResult.remaining
        },
        { 
          status: 429,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'X-RateLimit-Limit': RATE_LIMIT_CONFIG.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      );
    }

    const { name, email, subject, message }: ContactFormData = await request.json();

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Vérification des variables d'environnement
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Configuration du serveur manquante" },
        { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (!fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Sanitisation des données avec DOMPurify
    const sanitizedName = purify.sanitize(name);
    const sanitizedEmail = purify.sanitize(email);
    const sanitizedSubject = purify.sanitize(subject);
    const sanitizedMessage = purify.sanitize(message.replace(/\n/g, '<br>'));

    // Envoi de l'email via Resend
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nouveau message de contact: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${sanitizedName}</p>
            <p><strong>Email de réponse:</strong> ${sanitizedEmail}</p>
            <p><strong>Sujet:</strong> ${sanitizedSubject}</p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${sanitizedMessage}
            </div>
          </div>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Ce message a été envoyé depuis le formulaire de contact de arthursaunier.fr
          </p>
        </div>
      `,
      replyTo: email, // Permet de répondre directement à l'expéditeur
    });


    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'X-RateLimit-Limit': RATE_LIMIT_CONFIG.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}