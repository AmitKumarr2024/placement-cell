import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  rollNo: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pass", "Fail", "Pending","Cancel"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female","Other"],
  },
  dsaScore: {
    type: Number,
    required: true,
  },
  webDevScore: {
    type: Number,
    required: true,
  },
  reactDevScore: {
    type: Number,
    required: true,
  },
  // Reference to interviews
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    },
  ],
}, {
  timestamps: true,
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
