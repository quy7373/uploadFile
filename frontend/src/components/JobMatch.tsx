// components/JobMatch.tsx

import React from "react";
import { getScoreColor } from "../utils/cv.utils";
import type { CVAnalysisResult } from "../types/cv.types";

interface JobMatchProps {
  jobMatch: NonNullable<CVAnalysisResult["analysis"]["job_match"]>;
}

export const JobMatch: React.FC<JobMatchProps> = ({ jobMatch }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Độ phù hợp với công việc</h3>
      <div className="mb-4">
        <div className={`text-4xl font-bold ${getScoreColor(jobMatch.score)}`}>
          {jobMatch.score}%
        </div>
        <p className="text-gray-600 mt-2">{jobMatch.recommendation}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {/* Matched Requirements */}
        <div>
          <h4 className="font-semibold text-green-600 mb-2">Yêu cầu đáp ứng</h4>
          <ul className="space-y-1">
            {jobMatch.matched_requirements?.map((req, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                ✓ {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Requirements */}
        <div>
          <h4 className="font-semibold text-orange-600 mb-2">
            Yêu cầu chưa đáp ứng
          </h4>
          <ul className="space-y-1">
            {jobMatch.missing_requirements?.map((req, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                ⚠ {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
