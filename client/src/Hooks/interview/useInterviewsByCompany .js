import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const useInterviewsByCompany = (companyId) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchInterviewsByCompany = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/companies/${companyId}/interviews`);
      const dataResponse = await response.json();
      
      if (dataResponse.success) {
        setData(dataResponse.data);
        toast.success("Interviews fetched successfully");
      } else {
        throw new Error(dataResponse.error || "Failed to fetch interviews");
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      fetchInterviewsByCompany();
    }
  }, [companyId, fetchInterviewsByCompany]);

  return { loading, data, error, refetch: fetchInterviewsByCompany };
};

export default useInterviewsByCompany;
