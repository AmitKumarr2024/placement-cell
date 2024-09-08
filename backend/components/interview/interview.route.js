import express from "express";
import {
  assignStudentsToCompany,
  createInterview,
  deleteInterview,
  getAllInterview,
  getInterviewById,
  getInterviewsByCompany,
  updateInterviewStatus,
} from "./interview.controller.js";

const router = express.Router();

// Route to create a new interview
router.post("/interviews", createInterview);


// Route to get all interviews for a specific company
router.get("/companies/:companyId/interviews", getInterviewsByCompany); // New route

// Route to assign multiple students to a company
router.post("/assign-students", assignStudentsToCompany); // New route

// Route to get all interviews
router.get("/interviews/all", getAllInterview);

// Route to get an interview by ID
router.get("/interviews/:id", getInterviewById);

// Route to update interview status
router.patch("/interviews/:id/status", updateInterviewStatus);

// Route to delete an interview
router.delete("/interviews/:id", deleteInterview);

export default router;
