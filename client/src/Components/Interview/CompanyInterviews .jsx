import React, { useState, useEffect } from "react";
import useAllStudents from "../../Hooks/useAllStudents";

const CompanyInterviews = ({ onSelectStudents }) => {
  const { students, loading, error } = useAllStudents();
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    onSelectStudents(selectedStudents);
  }, [selectedStudents, onSelectStudents]);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  return (
    <div className="w-full h-full p-4">
      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {students && students.length > 0 ? (
        <ul className="space-y-2">
          {students.map((student) => (
            <li key={student._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={student._id}
                value={student._id}
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleCheckboxChange(student._id)}
                className="form-checkbox"
              />
              <label htmlFor={student._id} className="ml-2">{student.fullName}</label>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default CompanyInterviews;
