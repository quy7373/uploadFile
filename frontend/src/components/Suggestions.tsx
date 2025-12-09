// components/Suggestions.tsx

import React from "react";
import { TrendingUp } from "lucide-react";

interface SuggestionsProps {
  suggestions: string[];
}

export const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
        <TrendingUp size={24} />
        Gợi ý cải thiện
      </h3>
      <ul className="space-y-3">
        {suggestions.map((suggestion, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
          >
            <span className="text-blue-600 font-bold">{idx + 1}.</span>
            <span className="text-gray-700">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
