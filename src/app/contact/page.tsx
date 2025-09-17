import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact - Arthur Saunier",
  description: "Contactez-moi pour discuter de vos projets ou pour toute question.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contactez-moi
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Vous avez une question ? Une interrogation sur un de mes projet ou sur mon parcours ? N&apos;hésitez pas à me contacter via le formulaire ci-dessous ou par email. 
            Je ferai mon possible pour vous répondre dans les plus brefs délais. 
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Alternative Contact Methods */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Autres moyens de me contacter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Email</h3>
              <p className="text-zinc-400">
                <a 
                  href="mailto:votre@email.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  contact@arthursaunier.fr
                </a>
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">LinkedIn</h3>
              <p className="text-zinc-400">
                <a 
                  href="https://www.linkedin.com/in/arthur-saunier-0700922b5/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Connectons-nous
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}