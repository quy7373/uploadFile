import Groq from "groq-sdk";

class AIService {
  constructor() {
    const apiKey = process.env.GROQ_API_KEY;

    // Validate API key
    if (!apiKey) {
      console.error("❌ GROQ_API_KEY không được tìm thấy trong .env file!");
      throw new Error("Missing GROQ_API_KEY");
    }

    console.log("✅ Groq API Key loaded successfully (FREE API)");
    console.log("   Key preview:", apiKey.substring(0, 15) + "...");

    this.groq = new Groq({
      apiKey: apiKey,
    });
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
    "<điểm mạnh 3>"
  ],
  "weaknesses": [
    "<điểm yếu 1>",
    "<điểm yếu 2>",
    "<điểm yếu 3>"
  ],
  "suggestions": [
    "<gợi ý cải thiện 1>",
    "<gợi ý cải thiện 2>",
    "<gợi ý cải thiện 3>"
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
  "keywords": ["<từ khóa 1>", "<từ khóa 2>", "<từ khóa 3>"],
  "missing_keywords": ["<từ khóa thiếu 1>", "<từ khóa thiếu 2>"]
}

Tiêu chí đánh giá:
1. Thông tin liên hệ (10đ): Email, SĐT, LinkedIn, địa chỉ
2. Kinh nghiệm (30đ): Rõ ràng, đo lường được, liên quan
3. Học vấn (15đ): Trình độ, chuyên ngành phù hợp
4. Kỹ năng (25đ): Kỹ thuật, mềm, ngôn ngữ
5. Định dạng (20đ): Dễ đọc, ATS-friendly, không lỗi

CV cần phân tích:
${cvText}
`;

    if (jobDescription) {
      prompt += `\n\nMô tả công việc để so sánh:
${jobDescription}

Hãy thêm phần "job_match" vào JSON:
{
  "job_match": {
    "score": <điểm phù hợp 0-100>,
    "matched_requirements": ["<yêu cầu phù hợp 1>", "<yêu cầu phù hợp 2>"],
    "missing_requirements": ["<yêu cầu chưa đáp ứng 1>", "<yêu cầu chưa đáp ứng 2>"],
    "recommendation": "<khuyến nghị có nên ứng tuyển không>"
  }
}`;
    }

    prompt +=
      "\n\nQUAN TRỌNG: Chỉ trả về JSON thuần túy, KHÔNG thêm bất kỳ text, markdown hay giải thích nào khác.";
    return prompt;
  }

  /**
   * Phân tích CV với Groq AI (FREE)
   */
  async analyzeCV(cvText, jobDescription = null) {
    try {
      console.log("🤖 Bắt đầu phân tích CV với Groq AI (FREE)...");
      console.log("   CV length:", cvText.length, "characters");

      const prompt = this.createAnalysisPrompt(cvText, jobDescription);

      const completion = await this.groq.chat.completions.create({
        model: "llama-3.3-70b-versatile", // Model free mạnh nhất
        messages: [
          {
            role: "system",
            content:
              "Bạn là chuyên gia phân tích CV chuyên nghiệp. Luôn trả về JSON hợp lệ, không thêm markdown, giải thích hay text nào khác. Response phải bắt đầu bằng { và kết thúc bằng }.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });

      const responseText = completion.choices[0].message.content;
      console.log("✅ Nhận được response từ Groq AI");

      // Parse JSON
      let analysis;
      try {
        analysis = JSON.parse(responseText);
        console.log("✅ Parse JSON thành công");
      } catch (parseError) {
        console.error("❌ Lỗi parse JSON:", parseError);
        console.error("Raw response:", responseText);

        // Fallback: Try to extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysis = JSON.parse(jsonMatch[0]);
          console.log("✅ Đã extract và parse JSON thành công");
        } else {
          throw new Error("Không thể parse JSON từ response");
        }
      }

      // Validate và đảm bảo có đủ các trường
      return this.validateAnalysis(analysis);
    } catch (error) {
      console.error("❌ Lỗi phân tích CV:", error);

      // Detailed error logging
      if (error.status === 401) {
        console.error("   → API Key không hợp lệ");
        console.error("   → Kiểm tra: https://console.groq.com/keys");
      } else if (error.status === 429) {
        console.error("   → Vượt quá rate limit");
        console.error("   → Groq free: 30 requests/minute");
      } else if (error.status === 500) {
        console.error("   → Lỗi server của Groq");
      }

      throw new Error(
        error.status === 401
          ? "API key không hợp lệ. Vui lòng kiểm tra GROQ_API_KEY trong file .env"
          : error.status === 429
          ? "Đã vượt quá giới hạn 30 requests/minute. Vui lòng thử lại sau."
          : "Không thể phân tích CV. Vui lòng thử lại."
      );
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
      const completion = await this.groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "Bạn là chuyên gia phân tích CV. Trả về JSON thuần túy không có markdown.",
          },
          {
            role: "user",
            content: `Phân tích nhanh CV sau và trả về JSON:
{
  "score": <0-100>,
  "summary": "<tóm tắt 2-3 câu>"
}

CV:
${cvText}

Chỉ trả về JSON, không thêm text nào khác.`,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: "json_object" },
      });

      const responseText = completion.choices[0].message.content;
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Lỗi phân tích nhanh:", error);
      return { score: 0, summary: "Không thể phân tích" };
    }
  }
}

export default new AIService();
