import { useState } from "react";
import { useNavigate } from "react-router";

const useDeleteStudent = (id) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteStudent = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/students/delete-student/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        navigate("/");
        // You may want to include additional logic here (e.g., refetching the student list)
      } else {
        const errorText = await response.json();
        setError(errorText.message || "Error deleting student");
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, deleteStudent };
};

export default useDeleteStudent;
