// types/cv.types.ts

export interface CVAnalysisResult {
  analysis: {
    score: number;
    summary: string;
    sections: {
      contact: number;
      experience: number;
      education: number;
      skills: number;
      format: number;
    };
    ats_score: number;
    ats_analysis: string;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    keywords: string[];
    missing_keywords: string[];
    job_match?: {
      score: number;
      recommendation: string;
      matched_requirements: string[];
      missing_requirements: string[];
    };
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type ScoreLevel = 'excellent' | 'good' | 'average' | 'needs-improvement';

export interface CVAnalyzerState {
  file: File | null;
  jobDescription: string;
  loading: boolean;
  result: CVAnalysisResult | null;
  error: string | null;
}