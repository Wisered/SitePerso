import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Configuration DOMPurify pour l'environnement serveur Node.js
const window = new JSDOM('').window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const purify = DOMPurify(window as any);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message }: ContactFormData = await request.json();

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Vérification des variables d'environnement
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY n'est pas définie dans les variables d'environnement");
      return NextResponse.json(
        { error: "Configuration du serveur manquante" },
        { status: 500 }
      );
    }

    if (!fromEmail || !toEmail) {
      console.error("Variables d'environnement email manquantes");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
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
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire de contact:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}