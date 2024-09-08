import StudentModel from "./students.model.js";

// create student profile
export const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      rollNo,
      collegeName,
      status,
      gender,
      dsaScore,
      webDevScore,
      reactDevScore,
    } = req.body;

    const userExist = await StudentModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ error: "User already Exists" });
    }

    const newStudent = new StudentModel({
      fullName,
      email,
      rollNo,
      collegeName,
      status,
      gender,
      dsaScore,
      webDevScore,
      reactDevScore,
    });

    await newStudent.save();
    return res.status(201).json({
      message: "Student created successfull",
      data: {
        _id: newStudent._id,
        fullName: newStudent.fullName,
        email: newStudent.email,
        rollNo: newStudent.rollNo,
        collegeName: newStudent.collegeName,
        status: newStudent.status,
        gender: newStudent.gender,
        dsaScore: newStudent.dsaScore,
        webDevScore: newStudent.webDevScore,
        reactDevScore: newStudent.reactDevScore,
      },
      success: true,
    });
  } catch (error) {
    console.log("Error in createStudent Controller", error.message);
    return res.status(501).json({ message:error,error:true });
  }
};

// get one student details
export const getSingleStudent = async (req, res) => {
  try {
    const  id  = req.params.id; // Extract 'id' from route parameters
    
    

    const user = await StudentModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error in getSingleStudent Controller", error.message);
    return res.status(501).json({ error: "Internal Server Error" });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    // Sort by `createdAt` field in ascending order
    const students = await StudentModel.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json({
        message: "Request completed successfully",
        success: true,
        data: students,
      });
  } catch (error) {
    console.log("Error in getAllStudent Controller", error.message);
    return res.status(501).json({ error: "Internal Server Error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    // Extract the student ID from request parameters
    const id  = req.params.id;
    console.log("id",id);
    

    // Extract the data to be updated from the request body
    const { fullName, email, rollNo, collegeName, status, gender, dsaScore, webDevScore, reactDevScore } = req.body;

    // Check if the student exists and update their information
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id, // The ID of the student to update
      {
        fullName,
        email,
        rollNo,
        collegeName,
        status,
        gender,
        dsaScore,
        webDevScore,
        reactDevScore,
      },
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    // If the student doesn't exist, return a 404 error
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // If the update is successful, return the updated student data
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    // Log the error and return a 500 error response for internal server error
    console.log("Error in updateStudent Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteStudent = async (req, res) => {
  try {
    // Extract the student ID from the request parameters
    const  id  = req.params.id;

    // Find the student by ID and delete
    const deletedStudent = await StudentModel.findByIdAndDelete(id);

    // If no student is found with the given ID, return a 404 error
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // If the student is successfully deleted, return a success message
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent, // Optionally return the deleted student data
    });
  } catch (error) {
    // Log the error and return a 500 error response for internal server error
    console.log("Error in deleteStudent Controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

