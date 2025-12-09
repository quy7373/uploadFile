// services/cv.service.ts

import { API_CONFIG } from '../constants/cv.constants.ts';
import type { ApiResponse, CVAnalysisResult } from '../types/cv.types.ts';

export const cvService = {
  async analyzeCV(
    file: File,
    jobDescription?: string
  ): Promise<ApiResponse<CVAnalysisResult>> {
    const formData = new FormData();
    formData.append('cv', file);
    
    if (jobDescription?.trim()) {
      formData.append('jobDescription', jobDescription.trim());
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  },
};