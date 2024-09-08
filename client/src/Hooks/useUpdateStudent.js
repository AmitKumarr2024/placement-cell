import { useState } from "react";
import { useNavigate } from "react-router";

const useUpdateStudent = (id) => {
    const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStudent = async (studentData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/students/update-student/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (response.ok) {
          setSuccess(true);
          navigate('/')
        return data;
      } else {
        setError(data.error || "An error occurred");
        return null;
      }
    } catch (err) {
      setError(err.message || "Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStudent,
    loading,
    error,
    success,
  };
};

export default useUpdateStudent;
