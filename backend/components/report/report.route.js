import express from "express";
import { downloadStudentReport } from "./report.controller.js";

const router = express.Router();

router.get("/download-report",downloadStudentReport);

export default router;
