import { useState } from "react";
import toast from "react-hot-toast";

const useAssignStudentsToCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const assignStudentsToCompany = async (companyId, studentIds) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/interview/assign-students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId, studentIds }),
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setSuccess(true);
        toast.success("Students assigned to the company successfully");
      } else {
        throw new Error(dataResponse.error || "Failed to assign students");
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { assignStudentsToCompany, loading, success, error };
};

export default useAssignStudentsToCompany;
