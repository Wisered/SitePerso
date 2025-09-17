import { Download, FileText, Award } from "lucide-react";

export const metadata = {
  title: "Documents",
  description: "Téléchargez mon CV et mes lettres de recommandation",
};

interface Document {
  name: string;
  filename: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "cv" | "recommendation";
}

// Liste des documents disponibles
const documents: Document[] = [
  {
    name: "CV Arthur Saunier",
    filename: "CV_Arthur_Saunier.pdf",
    description: "Mon curriculum vitae détaillé",
    icon: FileText,
    type: "cv"
  },
//   {
//     name: "Lettre de recommandation 1",
//     filename: "Lettre_Recommandation_1.pdf",
//     description: "Recommandation académique",
//     icon: Award,
//     type: "recommendation"
//   }
];

function DocumentCard({ document }: { document: Document }) {
  const Icon = document.icon;
  
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
          <h3 className="font-semibold text-lg mb-2">{document.name}</h3>
          <p className="text-zinc-400 text-sm mb-4">{document.description}</p>
          <a
            href={`/documents/${document.filename}`}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const cvDocuments = documents.filter(doc => doc.type === "cv");
  const recommendationDocuments = documents.filter(doc => doc.type === "recommendation");

  return (
    <section className="py-12 sm:py-16">
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
          Documents
        </h1>
        <p className="text-zinc-300/90 text-lg mb-12">
          Téléchargez mon CV et mes lettres de recommandation. 
          Tous les documents sont au format PDF et régulièrement mis à jour.
        </p>

        {/* Section CV */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-400" />
            Curriculum Vitae
          </h2>
          <div className="grid gap-4">
            {cvDocuments.map((document, index) => (
              <DocumentCard key={index} document={document} />
            ))}
          </div>
        </div>

        {/* Section Lettres de recommandation */}
        {/* <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-emerald-400" />
            Lettres de recommandation
          </h2>
          <div className="grid gap-4">
            {recommendationDocuments.map((document, index) => (
              <DocumentCard key={index} document={document} />
            ))}
          </div>
        </div> */}

        {/* Note informative */}
        <div className="mt-12 p-6 bg-zinc-900/30 border border-zinc-800 rounded-lg max-w-4xl">
          <h3 className="font-semibold mb-2">Information</h3>
          <p className="text-zinc-400 text-sm">
            Si vous avez besoin d&apos;un format particulier ou de documents additionnels, 
            n&apos;hésitez pas à me contacter via la{" "}
            <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
              page de contact
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}