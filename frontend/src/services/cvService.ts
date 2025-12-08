import axios from "axios";
import { CVAnalyzeResponse } from "../types/cv.ts";

const API_URL = "http://localhost:5000/api/cv";

export async function analyzeCV(
  file: File,
  jobDescription?: string
): Promise<CVAnalyzeResponse> {
  const formData = new FormData();
  formData.append("cv", file);

  if (jobDescription?.trim()) {
    formData.append("jobDescription", jobDescription.trim());
  }

  const res = await axios.post(`${API_URL}/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!res.data.success) {
    throw new Error(res.data.message || "Analyze CV failed");
  }

  return res.data.data;
}
