import React, { useState } from "react";
import useAllStudents from "../../Hooks/useAllStudents";

const StudentList = ({ onAssignStudents }) => {
  const { students, loading, error } = useAllStudents();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleAssignClick = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
    } else {
      onAssignStudents(selectedStudents);
    }
  };

  

  return (
    <div>
      {students.map((item) => (
        <div key={item._id} className="flex flex-row justify-center">
          <input
            type="checkbox"
            value={item._id}
            onChange={() => handleCheckboxChange(item._id)}
            className="p-36 w-5"
          />
          <div className={`md:w-96 card ${item.status === "Pass" ? "bg-green-500" : item.status === "Pending" ? "bg-yellow-400" : item.status === "Cancel" ? "bg-white" : "bg-red-600"} rounded-lg mx-11`}>
            <div className="card-body p-4">
              <h2 className="card-title capitalize">{item.fullName}</h2>
              <p>Status: {item.status}</p>
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleAssignClick} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Assign Selected Students
      </button>
    </div>
  );
};

export default StudentList;
