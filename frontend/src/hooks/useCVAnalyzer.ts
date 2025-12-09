// hooks/useCVAnalyzer.ts
import React from 'react';
import { useState, useCallback } from 'react';
import type { CVAnalyzerState, CVAnalysisResult } from '../types/cv.types';
import { cvService } from '../services/cv.service';
import { validateFile } from '../utils/cv.utils';
import { API_CONFIG, ERROR_MESSAGES } from '../constants/cv.constants';

export const useCVAnalyzer = () => {
  const [state, setState] = useState<CVAnalyzerState>({
    file: null,
    jobDescription: '',
    loading: false,
    result: null,
    error: null,
  });

  const setFile = useCallback((file: File | null) => {
    setState((prev) => ({ ...prev, file, error: null, result: null }));
  }, []);

  const setJobDescription = useCallback((description: string) => {
    setState((prev) => ({ ...prev, jobDescription: description }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      
      if (!selectedFile) return;

      const validationError = validateFile(selectedFile, API_CONFIG.MAX_FILE_SIZE);
      
      if (validationError) {
        setError(validationError);
        return;
      }

      setFile(selectedFile);
    },
    [setFile, setError]
  );

  const analyzeCV = useCallback(async () => {
    if (!state.file) {
      setError(ERROR_MESSAGES.NO_FILE_SELECTED);
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null, result: null }));

    try {
      const response = await cvService.analyzeCV(state.file, state.jobDescription);

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          loading: false,
          result: response.data as CVAnalysisResult,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.message || ERROR_MESSAGES.UNKNOWN_ERROR,
        }));
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: ERROR_MESSAGES.SERVER_ERROR,
      }));
    }
  }, [state.file, state.jobDescription, setError]);

  return {
    ...state,
    setJobDescription,
    handleFileChange,
    analyzeCV,
  };
};