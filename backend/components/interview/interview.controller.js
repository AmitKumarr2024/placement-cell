import mongoose from "mongoose";
import StudentModel from "../students/students.model.js";
import InterviewModel from "./interview.model.js";
import CompanyModel from "./company.model.js";

// Create an interview
export const createInterview = async (req, res) => {
  try {
    const { companyName, date, status } = req.body;

    console.log("companyName", companyName);
    console.log("date", date);
    console.log("status", status);

    // Create a new interview
    const newInterview = new InterviewModel({
      companyName,
      date,
      status,
    });

    await newInterview.save();

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      data: newInterview,
    });
  } catch (error) {
    console.log("Error in createInterview Controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllInterview = async (req, res) => {
  try {
    const interview = await InterviewModel.find().sort({ createdAt: -1 });

    if (!interview) {
      return res.status(404).json({
        message: "No any Interview available",
        success: false,
      });
    }

     res.status(200).json({
      message: " getAllInterview Request completed successfully",
      data: interview,
      success: true,
    });
    console.log("getAllInterview Request completed successfully");
    
  } catch (error) {
    console.log("Error in getAllInterview Controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid interview ID format",
        error: true,
      });
    }

    const interviewExist = await InterviewModel.findById(id); // Use findById to query by _id

    if (!interviewExist) {
      return res
        .status(404)
        .json({ message: "Interview not found", error: true });
    }

    res.status(200).json({
      message: "getInterviewById Request completed successfully",
      success: true,
      data: interviewExist,
    });
    console.log("getInterviewById Request completed successfully");
  } catch (error) {
    console.log("Error in getInterviewById Controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Get all interviews for a student
export const getInterviewsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Check if the company exists
    const companyExists = await InterviewModel.findById(companyId);
    if (!companyExists) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }

    // Get all interviews for the company
    const interviews = await InterviewModel.find({ companyId });

    res.status(200).json({
      success: true,
      message: "getInterviewsByCompany Request completed successfully",
      data: interviews,
    });
    console.log("getInterviewsByCompany Request completed successfully");
  } catch (error) {
    console.log("Error in getInterviewsByCompany Controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};


// Function to assign multiple students to a company


export const assignStudentsToCompany = async (req, res) => {
  try {
    const { companyId, studentIds } = req.body;

    console.log("Company ID:", companyId);
    console.log("Student IDs:", studentIds);

    // Convert companyId to ObjectId
    const objectIdCompanyId = new mongoose.Types.ObjectId(companyId);

    // Check if the company exists using CompanyModel
    const company = await InterviewModel.findById(objectIdCompanyId);
    if (!company) {
      return res.status(404).json({ success: false, error: "Company not found" });
    }

    // Check if the students exist
    const students = await StudentModel.find({ '_id': { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return res.status(404).json({ success: false, error: "Some students not found" });
    }

    // Ensure company.students is an array
    if (!Array.isArray(company.students)) {
      company.students = [];
    }

    // Assign students to the company, avoid duplicates
    company.students = [new Set([...company.students, ...studentIds])];
    await company.save();

    return res.status(200).json({
      data:company,
      success: true,
      message: "Students assigned to the company successfully",
    });
  } catch (error) {
    console.error("Error in assignStudentsToCompany Controller:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};





// Update an interview status
export const updateInterviewStatus = async (req, res) => {
  try {
    const id = req.params.id; // Interview ID
    const { status } = req.body;

    

    // Update interview status
    const updatedInterview = await InterviewModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedInterview) {
      return res
        .status(404)
        .json({ success: false, error: "Interview not found" });
    }

     res.status(200).json({
      success: true,
      message: "Interview status updated successfully",
      data: updatedInterview,
    });
    console.log("Interview status updated successfully");
  } catch (error) {
    console.log("Error in updateInterviewStatus Controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Delete an interview
export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params; // Interview ID

    const deletedInterview = await InterviewModel.findByIdAndDelete(id);

    if (!deletedInterview) {
      return res
        .status(404)
        .json({ success: false, error: "Interview not found" });
    }

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
      data: deletedInterview,
    });
    console.log("Interview deleted successfully");
  } catch (error) {
    console.log("Error in deleteInterview Controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
