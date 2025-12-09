// components/AnalysisResults.tsx

import React from "react";
import type { CVAnalysisResult } from "../types/cv.types";
import { ScoreCard } from "./ScoreCard";
import { DetailedScores } from "./DetailedScores";
import { ATSScore } from "./ATSScore";
import { StrengthsWeaknesses } from "./StrengthsWeaknesses";
import { Suggestions } from "./Suggestions";
import { JobMatch } from "./JobMatch";
import { Keywords } from "./Keywords";

interface AnalysisResultsProps {
  result: CVAnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const { analysis } = result;

  return (
    <div className="space-y-6">
      <ScoreCard score={analysis.score} summary={analysis.summary} />

      <DetailedScores sections={analysis.sections} />

      <ATSScore score={analysis.ats_score} analysis={analysis.ats_analysis} />

      <StrengthsWeaknesses
        strengths={analysis.strengths}
        weaknesses={analysis.weaknesses}
      />

      <Suggestions suggestions={analysis.suggestions} />

      {analysis.job_match && <JobMatch jobMatch={analysis.job_match} />}

      <Keywords
        keywords={analysis.keywords}
        missingKeywords={analysis.missing_keywords}
      />
    </div>
  );
};
