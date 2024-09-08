import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const useAllInterview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Memoize fetchInterviewData using useCallback
  const fetchInterviewData = useCallback(async () => {
    try {
      const response = await fetch("/api/interview/interviews/all", {
        method: "GET",
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        console.log("data", dataResponse); // Log response for debugging
        setData(dataResponse.data); // Assuming dataResponse.data is an array
      } else {
        toast.error("Error fetching data");
        setError("Error fetching data");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures fetchInterviewData is stable

  useEffect(() => {
    fetchInterviewData();
  }, [fetchInterviewData]); // Depend on fetchInterviewData to avoid stale closures

  return { fetchInterviewData, loading, data, error };
};

export default useAllInterview;
