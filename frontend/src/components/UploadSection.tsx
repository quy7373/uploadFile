// components/UploadSection.tsx

import React from "react";
import { Upload, FileText, Loader2, XCircle, TrendingUp } from "lucide-react";
import { API_CONFIG } from "../constants/cv.constants";

interface UploadSectionProps {
  file: File | null;
  jobDescription: string;
  loading: boolean;
  error: string | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onJobDescriptionChange: (value: string) => void;
  onAnalyze: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  file,
  jobDescription,
  loading,
  error,
  onFileChange,
  onJobDescriptionChange,
  onAnalyze,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Upload size={24} />
        Upload CV của bạn
      </h2>

      <div className="space-y-4">
        {/* File Input */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
          <input
            type="file"
            accept={API_CONFIG.ACCEPTED_FILE_TYPES}
            onChange={onFileChange}
            className="hidden"
            id="cv-upload"
          />
          <label htmlFor="cv-upload" className="cursor-pointer">
            <FileText className="mx-auto mb-2 text-gray-400" size={48} />
            <p className="text-gray-600 mb-1">
              {file ? file.name : "Chọn file PDF hoặc DOCX"}
            </p>
            <p className="text-sm text-gray-400">Tối đa 5MB</p>
          </label>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả công việc (tuỳ chọn)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Dán mô tả công việc để so sánh độ phù hợp..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={onAnalyze}
          disabled={loading || !file}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Đang phân tích...
            </>
          ) : (
            <>
              <TrendingUp size={20} />
              Phân tích CV
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <XCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};
