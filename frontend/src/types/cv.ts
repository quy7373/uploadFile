export interface CVAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  ats_score: number;
  ats_analysis: string;

  sections: {
    contact: number;
    experience: number;
    education: number;
    skills: number;
    format: number;
  };

  keywords: string[];
  missing_keywords: string[];

  job_match?: {
    score: number;
    matched_requirements: string[];
    missing_requirements: string[];
    recommendation: string;
  };
}

export interface CVAnalyzeResponse {
  fileName: string;
  fileSize: number;
  extractedLength: number;
  analysis: CVAnalysis;
}
