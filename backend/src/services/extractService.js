import fs from "fs/promises";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // ✅ BẮT BUỘC

class ExtractService {
  async extractPDF(filePath) {
    try {
      const buffer = await fs.readFile(filePath);
      const data = await pdfParse(buffer);

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

  async extractDOCX(filePath) {
    try {
      const buffer = await fs.readFile(filePath);
      const result = await mammoth.extractRawText({ buffer });

      return {
        success: true,
        text: result.value,
      };
    } catch (error) {
      console.error("Lỗi trích xuất DOCX:", error);
      return {
        success: false,
        error: "Không thể đọc file DOCX",
      };
    }
  }

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
      return { success: false, error: "File không hỗ trợ" };
    }

    // xoá file tạm sau khi xử lý
    await fs.unlink(filePath).catch(() => {});
    return result;
  }

  cleanText(text) {
    return text.replace(/\s+/g, " ").trim();
  }
}

export default new ExtractService();
