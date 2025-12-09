// components/StrengthsWeaknesses.tsx

import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  strengths,
  weaknesses,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Strengths */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
          <CheckCircle size={24} />
          Điểm mạnh
        </h3>
        <ul className="space-y-2">
          {strengths.map((strength, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-600">
          <XCircle size={24} />
          Điểm yếu
        </h3>
        <ul className="space-y-2">
          {weaknesses.map((weakness, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">⚠</span>
              <span className="text-gray-700">{weakness}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
