import { Parser } from "json2csv";
import InterviewModel from "../interview/interview.model.js";
import StudentModel from "../students/students.model.js";


export const downloadStudentReport = async (req, res) => {
  try {
    // Step 1: Fetch all students
    const students = await StudentModel.find();

    // Step 2: Fetch all interviews
    const interviews = await InterviewModel.find();

    // Step 3: Create a mapping of studentId to interviews
    const studentInterviewsMap = {};

    // Populate the studentInterviewsMap with interview details
    interviews.forEach(interview => {
      const studentId = interview.studentId.toString();
      if (!studentInterviewsMap[studentId]) {
        studentInterviewsMap[studentId] = [];
      }
      studentInterviewsMap[studentId].push({
        companyName: interview.companyName,
        date: interview.date.toISOString().split('T')[0], // Convert date to YYYY-MM-DD format
        status: interview.status,
      });
    });

    // Step 4: Prepare data for CSV
    const csvData = [];

    students.forEach(student => {
      const studentInterviews = studentInterviewsMap[student._id.toString()] || [];
      
      // Add a row for each interview
      studentInterviews.forEach(interview => {
        csvData.push({
          fullName: student.fullName,
          email: student.email,
          rollNo: student.rollNo,
          collegeName: student.collegeName,
          status: student.status,
          gender: student.gender,
          dsaScore: student.dsaScore,
          webDevScore: student.webDevScore,
          reactDevScore: student.reactDevScore,
          companyName: interview.companyName,
          interviewDate: interview.date,
          interviewStatus: interview.status,
        });
      });

      // If no interviews, still add the student with empty interview fields
      if (studentInterviews.length === 0) {
        csvData.push({
          fullName: student.fullName,
          email: student.email,
          rollNo: student.rollNo,
          collegeName: student.collegeName,
          status: student.status,
          gender: student.gender,
          dsaScore: student.dsaScore,
          webDevScore: student.webDevScore,
          reactDevScore: student.reactDevScore,
          companyName: "",
          interviewDate: "",
          interviewStatus: "",
        });
      }
    });

    // Step 5: Define fields for the CSV
    const fields = [
      { label: "Full Name", value: "fullName" },
      { label: "Email", value: "email" },
      { label: "Roll No", value: "rollNo" },
      { label: "College Name", value: "collegeName" },
      { label: "Status", value: "status" },
      { label: "Gender", value: "gender" },
      { label: "DSA Score", value: "dsaScore" },
      { label: "Web Dev Score", value: "webDevScore" },
      { label: "React Dev Score", value: "reactDevScore" },
      { label: "Company Name", value: "companyName" },
      { label: "Interview Date", value: "interviewDate" },
      { label: "Interview Status", value: "interviewStatus" },
    ];

    // Step 6: Convert JSON to CSV
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData);

    // Step 7: Send CSV file as a downloadable response
    res.header("Content-Type", "text/csv");
    res.attachment("students_interviews_report.csv");
    return res.send(csv);

  } catch (error) {
    console.log("Error generating CSV report:", error.message);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
