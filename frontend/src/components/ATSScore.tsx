// components/ATSScore.tsx

import React from "react";
import { AlertCircle } from "lucide-react";

interface ATSScoreProps {
  score: number;
  analysis: string;
}

export const ATSScore: React.FC<ATSScoreProps> = ({ score, analysis }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="text-blue-600" size={24} />
        <h3 className="text-xl font-semibold">Điểm ATS: {score}/100</h3>
      </div>
      <p className="text-gray-700">{analysis}</p>
    </div>
  );
};
