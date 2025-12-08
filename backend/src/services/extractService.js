import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");
import mammoth from "mammoth";
import fs from "fs/promises";

class ExtractService {
  /**
   * Trích xuất text từ file PDF
   */
  async extractPDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return {
        success: true,
        text: data.text,
        pages: data.numpages,
      };
    } catch (error) {
      console.error("Lỗi trích xuất PDF:", error);
      return {
        success: false,
        error: "Không thể đọc file PDF",
      };
    }
  }

  /**
   * Trích xuất text từ file DOCX
   */
  async extractDOCX(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const result = await mammoth.extractRawText({ buffer: dataBuffer });
      return {
        success: true,
        text: result.value,
        messages: result.messages,
      };
    } catch (error) {
      console.error("Lỗi trích xuất DOCX:", error);
      return {
        success: false,
        error: "Không thể đọc file DOCX",
      };
    }
  }

  /**
   * Xác định loại file và trích xuất
   */
  async extractContent(filePath, mimetype) {
    let result;

    if (mimetype === "application/pdf") {
      result = await this.extractPDF(filePath);
    } else if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      result = await this.extractDOCX(filePath);
    } else {
      return {
        success: false,
        error: "Định dạng file không được hỗ trợ",
      };
    }

    // Xóa file sau khi trích xuất
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Không thể xóa file tạm:", error);
    }

    return result;
  }

  /**
   * Làm sạch text đã trích xuất
   */
  cleanText(text) {
    return text
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n")
      .trim();
  }
}

export default new ExtractService();
