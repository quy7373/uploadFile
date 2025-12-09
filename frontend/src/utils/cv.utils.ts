// utils/cv.utils.ts

import { SCORE_THRESHOLDS } from '../constants/cv.constants';

export const getScoreColor = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'text-green-600';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreLabel = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'Xuất sắc';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'Tốt';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'Trung bình';
  return 'Cần cải thiện';
};

export const validateFile = (file: File, maxSize: number): string | null => {
  if (file.size > maxSize) {
    return 'File không được vượt quá 5MB';
  }
  return null;
};