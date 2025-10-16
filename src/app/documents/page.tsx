import { Download, FileText, Globe } from "lucide-react";

export const metadata = {
  title: "Documents",
  description: "Download my CV in PDF format.",
};

interface Document {
  name: string;
  filename: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "cv" | "recommendation";
  language: "fr" | "en";
}

// Liste des documents disponibles
const documents: Document[] = [
  {
    name: "CV Arthur Saunier",
    filename: "CV_Arthur_Saunier_FR.pdf",
    description: "Mon curriculum vitae détaillé en français",
    icon: FileText,
    type: "cv",
    language: "fr"
  },
  {
    name: "CV Arthur Saunier",
    filename: "CV_Arthur_Saunier_EN.pdf",
    description: "My detailed resume in English",
    icon: FileText,
    type: "cv",
    language: "en"
  },
//   {
//     name: "Lettre de recommandation 1",
//     filename: "Lettre_Recommandation_1.pdf",
//     description: "Recommandation académique",
//     icon: Award,
//     type: "recommendation",
//     language: "fr"
//   }
];

function DocumentCard({ document }: { document: Document }) {
  const Icon = document.icon;
  
  const languageFlag = document.language === "fr" ? "🇫🇷" : "🇬🇧";
  const languageLabel = document.language === "fr" ? "Français" : "English";
  
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 sm:p-6 hover:bg-zinc-900/70 transition-colors">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className={`p-3 rounded-lg ${
          document.type === "cv" 
            ? "bg-blue-500/10 text-blue-400" 
            : "bg-emerald-500/10 text-emerald-400"
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{document.name}</h3>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-xs font-medium">
              {languageLabel}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mb-4">{document.description}</p>
          <a
            href={`/documents/${document.filename}`}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const cvDocuments = documents.filter(doc => doc.type === "cv");
  // const recommendationDocuments = documents.filter(doc => doc.type === "recommendation");

  return (
    <section className="py-12 sm:py-16">
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          Documents
        </h1>
        <p className="text-zinc-300/90 text-lg mb-6">
          Download my CV in French and English, as well as my recommendation letters. 
          All documents are in PDF format and regularly updated.
        </p>

        {/* Section CV */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            Curriculum Vitae
          </h2>
          <div className="grid gap-4">
            {cvDocuments.map((document, index) => (
              <DocumentCard key={index} document={document} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}