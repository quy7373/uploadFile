// constants/cv.constants.ts

export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  ENDPOINTS: {
    ANALYZE: '/api/cv/analyze',
  },
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: '.pdf,.docx',
} as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  AVERAGE: 40,
} as const;

export const SECTION_LABELS = {
  contact: 'Liên hệ',
  experience: 'Kinh nghiệm',
  education: 'Học vấn',
  skills: 'Kỹ năng',
  format: 'Định dạng',
} as const;

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File không được vượt quá 5MB',
  NO_FILE_SELECTED: 'Vui lòng chọn file CV',
  SERVER_ERROR: 'Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.',
  UNKNOWN_ERROR: 'Có lỗi xảy ra',
} as const;