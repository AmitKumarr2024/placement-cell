import React from "react";
import useDeleteStudent from "../../Hooks/useDeleteStudent";
import toast from "react-hot-toast";

const DeleteStudent = ({ studentId }) => {
 
  const { deleteStudent, loading, error, success } =
    useDeleteStudent(studentId);

  const handleDelete = async () => {
    try {
      await deleteStudent();
      if (success) {
        toast.success("Student deleted successfully!");
        
      }
    } catch (error) {
      toast.error(`Error deleting student: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`bg-red-500 text-white text-lg px-3 rounded-md ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteStudent;
