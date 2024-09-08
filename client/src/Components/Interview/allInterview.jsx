import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAllInterview from "../../Hooks/interview/useAllInterview";
import CreateBox from "./CreateBox"; // Import CreateBox

const AllInterview = ({onSuccess}) => {
  const { fetchInterviewData, loading, data, error } = useAllInterview();

  useEffect(() => {
    fetchInterviewData();
  }, [onSuccess]); // Add refresh as a dependency to re-fetch data when it changes

  // Format date helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to trigger data refresh

  return (
    <div className="flex flex-col w-full h-full px-4 border-gray-300 rounded-lg overflow-y-auto">
      {/* Include CreateBox and pass handleRefresh function as a prop */}
     
      {loading ? (
        <p className="text-center">Loading..</p>
      ) : error ? (
        <p className="text-center text-red-600">Error fetching interviews.</p>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <Link
            to={`/update-interview/${item._id}`}
            key={index}
            className="card w-full my-4 shadow-md bg-yellow-100 rounded-lg transition-transform transform hover:scale-95"
          >
            <div className="card-body p-6 rounded-lg">
              <h2 className="card-title text-xl font-bold text-gray-800">
                {item.companyName}
              </h2>
              <p className="text-gray-600">Interview Date: {formatDate(item.date)}</p>
              <p className="text-pink-500 font-bold">{item.status}</p>
              <div className="card-actions justify-end">
                <span className="text-blue-600 hover:underline">Edit</span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-600">No interviews found.</p>
      )}
    </div>
  );
};

export default AllInterview;
