import React, { useState } from "react";
import toast from "react-hot-toast";

const useCreateInterview = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createInterview = async ({ companyName, date, status }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/interview/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, date, status }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create interview");
      }
      setSuccess(true);
      toast.success("Interview created successfully");

      return { success: true, data: data.data };
    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { createInterview, loading, error, success };
};

export default useCreateInterview;
