import { useState } from "react";
import { analyzeCV } from "../services/cvService.ts";
import { CVAnalyzeResponse } from "../types/cv.ts";

export function useCVAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CVAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file) {
      setError("Vui lòng chọn file CV");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeCV(file, jobDescription);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    setFile,
    jobDescription,
    setJobDescription,
    loading,
    result,
    error,
    handleAnalyze,
  };
}
