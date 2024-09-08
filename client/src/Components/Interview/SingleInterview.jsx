import React, { useState } from "react";
import UpdateInterviewBox from "./UpdateInterviewBox";
import CompanyInterviews from "./CompanyInterviews ";
import useAssignStudentsToCompany from "../../Hooks/useAssignStudentsToCompany ";

const SingleInterview = ({ data, loading, error, onUpdate }) => {
  const [assignedStudents, setAssignedStudents] = useState([]);
  const { assignStudentsToCompany, loading: assigning, success, error: assignError } = useAssignStudentsToCompany();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSelectStudents = (selectedStudentIds) => {
    setAssignedStudents(selectedStudentIds);
  };

  const handleAssignStudents = () => {
    const companyId = data._id; // Assuming data contains company ID
    assignStudentsToCompany(companyId, assignedStudents);
  };

  return (
    <div className="flex flex-col w-full h-full px-4 border-gray-300 rounded-lg overflow-y-auto">
      {loading ? (
        <p className="text-center">Loading..</p>
      ) : error ? (
        <p className="text-center text-red-600">Error fetching interviews.</p>
      ) : data ? (
        <div className="card w-full h-[940px] md:h-full flex md:flex-row flex-col justify-between my-4 shadow-md bg-yellow-100 rounded-lg">
          <div className="card-body w-96 p-6 rounded-lg">
            <p className="text-xl p-1 text-center bg-cyan-500 rounded-2xl font-bold text-white">Company List</p>
            <h2 className="card-title text-xl font-bold text-gray-800 mt-4">
              <span className="text-sm font-medium text-slate-500">Company Name </span> {data.companyName}
            </h2>
            <p className="text-gray-600">
              Interview Date: {formatDate(data.date)}
            </p>
            <p className="text-pink-500 font-bold">
              <span className="text-sm font-medium text-slate-500">Status: </span>{data.status}
            </p>
            <UpdateInterviewBox
              initialStatus={data.status}
              onStatusUpdate={onUpdate}
            />
          </div>

          {/* Student list for assignment */}
          <div className="mt-2 overflow-y-auto">
            <p className="text-xl text-center bg-cyan-500 rounded-2xl mx-9 font-bold text-white p-1">Student List</p>
            <CompanyInterviews onSelectStudents={handleSelectStudents} />
          </div>

          <div className="h-full  flex flex-col">
            {/* Display the assigned students */}
          <div className="h-80 mt-6 w-80  border-4">
            {assignedStudents.length > 0 ? (
              <div className="overflow-y-auto">
                <h3 className="text-lg font-bold">Assigned Students:</h3>
                <ul>
                  {assignedStudents.map((studentId) => (
                    <li key={studentId}>{studentId}</li> // Ideally, you'd map student IDs to names
                  ))}
                </ul>
              </div>
            ) : (
              <p>No students assigned to this interview yet.</p>
            )}
          </div>

          <button
            onClick={handleAssignStudents}
            disabled={assigning}
            className="float-end mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {assigning ? "Assigning..." : "Assign Students"}
          </button>
          </div>
          {success && <p className="text-green-600">Students assigned successfully!</p>}
          {assignError && <p className="text-red-600">Error: {assignError}</p>}
        </div>
      ) : (
        <p className="text-center text-gray-600">No interviews found.</p>
      )}
    </div>
  );
};

export default SingleInterview;
