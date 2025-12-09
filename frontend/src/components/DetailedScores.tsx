// components/DetailedScores.tsx

import React from "react";
import { getScoreColor } from "../utils/cv.utils";
import { SECTION_LABELS } from "../constants/cv.constants";
import type { CVAnalysisResult } from "../types/cv.types";

interface DetailedScoresProps {
  sections: CVAnalysisResult["analysis"]["sections"];
}

export const DetailedScores: React.FC<DetailedScoresProps> = ({ sections }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Điểm chi tiết</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(sections).map(([key, value]) => (
          <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-3xl font-bold ${getScoreColor(value * 10)}`}>
              {value}/10
            </div>
            <div className="text-sm text-gray-600 capitalize mt-1">
              {SECTION_LABELS[key as keyof typeof SECTION_LABELS] || key}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
