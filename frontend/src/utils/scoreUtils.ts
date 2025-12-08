export const getScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

export const getScoreLabel = (score: number): string => {
  if (score >= 80) return "Xuất sắc";
  if (score >= 60) return "Tốt";
  if (score >= 40) return "Trung bình";
  return "Cần cải thiện";
};
