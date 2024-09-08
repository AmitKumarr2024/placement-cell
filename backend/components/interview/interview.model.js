import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["scheduled", "completed", "cancelled"],
  },
  studentId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  name: {
    type: String,
  },
}, {
  timestamps: true,
});

const InterviewModel = mongoose.model("Interview", interviewSchema);

export default InterviewModel;
