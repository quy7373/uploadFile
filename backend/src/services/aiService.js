import { GoogleGenerativeAI } from "@google/generative-ai";

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  /**
   * Tạo prompt phân tích CV chi tiết
   */
  createAnalysisPrompt(cvText, jobDescription = null) {
    let prompt = `Bạn là chuyên gia tuyển dụng và phân tích CV chuyên nghiệp. 
Hãy phân tích CV sau đây và trả về kết quả dưới dạng JSON theo format sau:

{
  "score": <số điểm từ 0-100>,
  "summary": "<tóm tắt ngắn gọn về ứng viên>",
  "strengths": [
    "<điểm mạnh 1>",
    "<điểm mạnh 2>",
    "..."
  ],
  "weaknesses": [
    "<điểm yếu 1>",
    "<điểm yếu 2>",
    "..."
  ],
  "suggestions": [
    "<gợi ý cải thiện 1>",
    "<gợi ý cải thiện 2>",
    "..."
  ],
  "ats_score": <điểm ATS từ 0-100>,
  "ats_analysis": "<phân tích khả năng vượt qua ATS>",
  "sections": {
    "contact": <điểm từ 0-10>,
    "experience": <điểm từ 0-10>,
    "education": <điểm từ 0-10>,
    "skills": <điểm từ 0-10>,
    "format": <điểm từ 0-10>
  },
  "keywords": ["<từ khóa 1>", "<từ khóa 2>", "..."],
  "missing_keywords": ["<từ khóa thiếu 1>", "..."]
}

Tiêu chí đánh giá:
1. **Thông tin liên hệ** (10 điểm): Email, SĐT, LinkedIn, địa chỉ
2. **Kinh nghiệm** (30 điểm): Rõ ràng, đo lường được, liên quan
3. **Học vấn** (15 điểm): Trình độ, chuyên ngành phù hợp
4. **Kỹ năng** (25 điểm): Kỹ thuật, mềm, ngôn ngữ
5. **Định dạng** (20 điểm): Dễ đọc, ATS-friendly, không lỗi

CV cần phân tích:
${cvText}
`;

    if (jobDescription) {
      prompt += `\n\nMô tả công việc để so sánh:
${jobDescription}

Hãy thêm phần "job_match" vào JSON:
{
  ...
  "job_match": {
    "score": <điểm phù hợp 0-100>,
    "matched_requirements": ["<yêu cầu phù hợp>", "..."],
    "missing_requirements": ["<yêu cầu chưa đáp ứng>", "..."],
    "recommendation": "<khuyến nghị có nên ứng tuyển không>"
  }
}`;
    }

    prompt += "\n\nChỉ trả về JSON, không thêm giải thích.";
    return prompt;
  }

  /**
   * Phân tích CV với Gemini AI
   */
  async analyzeCV(cvText, jobDescription = null) {
    try {
      const prompt = this.createAnalysisPrompt(cvText, jobDescription);

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Loại bỏ markdown code blocks nếu có
      text = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      // Parse JSON
      const analysis = JSON.parse(text);

      // Validate và đảm bảo có đủ các trường
      return this.validateAnalysis(analysis);
    } catch (error) {
      console.error("Lỗi phân tích CV:", error);
      throw new Error("Không thể phân tích CV. Vui lòng thử lại.");
    }
  }

  /**
   * Validate và bổ sung các trường bị thiếu
   */
  validateAnalysis(analysis) {
    const defaultAnalysis = {
      score: 0,
      summary: "",
      strengths: [],
      weaknesses: [],
      suggestions: [],
      ats_score: 0,
      ats_analysis: "",
      sections: {
        contact: 0,
        experience: 0,
        education: 0,
        skills: 0,
        format: 0,
      },
      keywords: [],
      missing_keywords: [],
    };

    return {
      ...defaultAnalysis,
      ...analysis,
      sections: {
        ...defaultAnalysis.sections,
        ...(analysis.sections || {}),
      },
    };
  }

  /**
   * Phân tích nhanh (chỉ score và tóm tắt)
   */
  async quickAnalyze(cvText) {
    try {
      const prompt = `Phân tích nhanh CV sau và trả về JSON:
{
  "score": <0-100>,
  "summary": "<tóm tắt 2-3 câu>"
}

CV:
${cvText}

Chỉ trả về JSON.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      text = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      return JSON.parse(text);
    } catch (error) {
      console.error("Lỗi phân tích nhanh:", error);
      return { score: 0, summary: "Không thể phân tích" };
    }
  }
}

export default new AIService();
