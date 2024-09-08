import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/students/all-student", {
        method: "get",
      });
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.data);
        toast.success("Students fetched successfully");
      } else {
        throw new Error(data.message || "Failed to fetch students");
      }
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students when the hook is used
  useEffect(() => {
    fetchStudents();
  }, []);

  // Return students, loading state, error, and a refetch function
  return { students, loading, error, fetchStudents };
};

export default useAllStudents;
