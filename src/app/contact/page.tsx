import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact - Arthur Saunier",
  description: "Contact me to discuss your projects or for any questions.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact Me
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Have a question? An inquiry about one of my projects or my background? Don&apos;t hesitate to contact me via the form below or by email. 
            I&apos;ll do my best to respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Alternative Contact Methods */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Other ways to contact me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">Email</h3>
              <p className="text-zinc-400">
                <a 
                  href="mailto:contact@arthursaunier.fr" 
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
                  Let&apos;s connect
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}