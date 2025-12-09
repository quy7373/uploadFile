// components/Keywords.tsx

import React from "react";

interface KeywordsProps {
  keywords: string[];
  missingKeywords: string[];
}

export const Keywords: React.FC<KeywordsProps> = ({
  keywords,
  missingKeywords,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Từ khoá</h3>

      {/* Present Keywords */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Có trong CV</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      {missingKeywords.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Nên thêm vào
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
