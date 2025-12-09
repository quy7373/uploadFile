import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import uploadCvRouter from "./routers/UploadCv.router.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/cv", uploadCvRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
