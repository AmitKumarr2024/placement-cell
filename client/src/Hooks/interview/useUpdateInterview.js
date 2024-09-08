import React, { useState } from "react";
import toast from "react-hot-toast";

const useUpdateInterview = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateInterviewStatus = async (status) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`/api/interview/interviews/${id}/status`, {
        method: "PATCH", // Ensure PATCH is uppercase
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use response.ok to check if request was successful
        throw new Error(data.error || "Failed to update interview status");
      }

      setSuccess(true);
      toast.success("Interview status updated successfully");
      console.log("Updated status:", data.data);
      return data.data;
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { updateInterviewStatus, loading, error, success };
};

export default useUpdateInterview;
