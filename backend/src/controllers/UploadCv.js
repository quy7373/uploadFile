import extractService from "../services/extractService.js";
import aiService from "../services/aiService.js";

export const uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng upload file CV",
      });
    }

    // 1. Trích xuất nội dung từ CV
    const extractResult = await extractService.extractContent(
      req.file.path,
      req.file.mimetype
    );

    if (!extractResult.success) {
      return res.status(400).json({
        success: false,
        message: extractResult.error,
      });
    }

    // 2. Làm sạch text
    const cleanedText = extractService.cleanText(extractResult.text);

    if (cleanedText.length < 100) {
      return res.status(400).json({
        success: false,
        message: "CV quá ngắn hoặc không đọc được nội dung",
      });
    }

    // 3. Lấy job description nếu có
    const jobDescription = req.body.jobDescription || null;

    // 4. Phân tích CV bằng AI
    const analysis = await aiService.analyzeCV(cleanedText, jobDescription);

    // 5. Trả về kết quả
    res.json({
      success: true,
      data: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        extractedLength: cleanedText.length,
        analysis: analysis,
      },
    });
  } catch (error) {
    console.error("Lỗi phân tích CV:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Đã xảy ra lỗi khi phân tích CV",
    });
  }
};

export const uploadQuickCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng upload file CV",
      });
    }

    const extractResult = await extractService.extractContent(
      req.file.path,
      req.file.mimetype
    );

    if (!extractResult.success) {
      return res.status(400).json({
        success: false,
        message: extractResult.error,
      });
    }

    const cleanedText = extractService.cleanText(extractResult.text);
    const quickAnalysis = await aiService.quickAnalyze(cleanedText);

    res.json({
      success: true,
      data: quickAnalysis,
    });
  } catch (error) {
    console.error("Lỗi phân tích nhanh:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Đã xảy ra lỗi",
    });
  }
};
export const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "CV Analysis API đang hoạt động",
    timestamp: new Date().toISOString(),
  });
};
