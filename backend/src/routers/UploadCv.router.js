import { Router } from "express";
import {
  uploadCV,
  uploadQuickCV,
  healthCheck,
} from "../controllers/UploadCv.js";
import {
  uploadCVMiddleware,
  multerErrorHandler,
} from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/analyze",
  uploadCVMiddleware.single("cv"),
  multerErrorHandler,
  uploadCV
);
router.post(
  "/analyze-quick",
  uploadCVMiddleware.single("cv"),
  multerErrorHandler,
  uploadQuickCV
);
router.get("/health", multerErrorHandler, healthCheck);

export default router;
