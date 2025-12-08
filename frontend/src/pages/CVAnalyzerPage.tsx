import { useCVAnalyzer } from "../hooks/useCVAnalyzer.ts";
import UploadSection from "../components/cv/UploadSection.tsx";
import ResultOverview from "../components/cv/ResultOverview.tsx";

export default function CVAnalyzerPage() {
  const analyzer = useCVAnalyzer();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <UploadSection {...analyzer} />

      {analyzer.result && (
        <ResultOverview analysis={analyzer.result.analysis} />
      )}
    </div>
  );
}
