// CVAnalyzer.tsx

import React from "react";
import { Header } from "../components/Header";
import { UploadSection } from "../components/UploadSection";
import { AnalysisResults } from "../components/AnalysisResults";
import { useCVAnalyzer } from "../hooks/useCVAnalyzer";
const CVAnalyzer: React.FC = () => {
  const {
    file,
    jobDescription,
    loading,
    result,
    error,
    setJobDescription,
    handleFileChange,
    analyzeCV,
  } = useCVAnalyzer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <UploadSection
          file={file}
          jobDescription={jobDescription}
          loading={loading}
          error={error}
          onFileChange={handleFileChange}
          onJobDescriptionChange={setJobDescription}
          onAnalyze={analyzeCV}
        />

        {result && <AnalysisResults result={result} />}
      </div>
    </div>
  );
};

export default CVAnalyzer;
