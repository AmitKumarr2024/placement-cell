import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useSignalInterview = (id) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchSingleInterview = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/interview/interviews/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check response status
      if (!response.ok) {
        const errorResponse = await response.json(); // Assuming the server returns a JSON error message
        console.error("Error response:", errorResponse);
        throw new Error(`Failed to fetch interview. Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      
      if (dataResponse.success) {
        setData(dataResponse.data); // Assuming dataResponse.data contains the interview object
        console.log("Single Interview Data:", dataResponse.data);
      } else {
        toast.error("Error fetching interview data");
        setError("Error fetching interview data");
      }
    } catch (error) {
      console.error("Error caught:", error);
      toast.error(`Error: ${error.message || "Something went wrong"}`);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleInterview(); // Fetch only if an id is provided
    }
  }, [id]);

  return { fetchSingleInterview, loading, data, error };
};

export default useSignalInterview;
