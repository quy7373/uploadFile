import { Router } from "express";
import {
  uploadCV,
  uploadQuickCV,
  healthCheck,
} from "../controllers/UploadCv.js";
import { uploadCVMiddleware } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/analyze", uploadCVMiddleware.single("cv"), uploadCV);
router.post("/analyze-quick", uploadCVMiddleware.single("cv"), uploadQuickCV);
router.get("/health", healthCheck);

export default router;
