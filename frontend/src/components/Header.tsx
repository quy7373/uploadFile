// components/Header.tsx

import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        🎯 Phân Tích CV Thông Minh
      </h1>
      <p className="text-gray-600">
        Powered by Gemini AI - Đánh giá chuyên nghiệp, gợi ý cải thiện
      </p>
    </div>
  );
};
