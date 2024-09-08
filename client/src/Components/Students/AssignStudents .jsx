import React, { useState } from "react";
import useAssignStudentsToCompany from "../../Hooks/useAssignStudentsToCompany ";
import { useParams } from "react-router";

const AssignStudents = () => {
    const{studentIds}=useParams();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const { assignStudentsToCompany, loading, success, error } = useAssignStudentsToCompany({studentIds,});

  const handleSubmit = () => {
    const companyId = "someCompanyId"; // Replace with actual company ID
    assignStudentsToCompany(companyId, selectedStudents);
  };

  return (
    <div className="w-full p-4 ">
      <h1 className="text-2xl font-bold mb-4">Assign Students to Company</h1>
      <div className="mb-4">
        
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-2 py-2 bg-blue-500 text-white rounded-md"
      >
        {loading ? "Assigning..." : "Assign Students"}
      </button>
      {success && <p className="text-green-600">Students assigned successfully!</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default AssignStudents;
