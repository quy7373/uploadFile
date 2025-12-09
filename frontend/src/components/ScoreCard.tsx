// components/ScoreCard.tsx

import React from "react";
import { getScoreColor, getScoreLabel } from "../utils/cv.utils";

interface ScoreCardProps {
  score: number;
  summary: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Kết quả phân tích</h2>
        <div className="text-right">
          <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <div className="text-sm text-gray-600">{getScoreLabel(score)}</div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
};
