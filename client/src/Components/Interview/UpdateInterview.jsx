import React, { useEffect, useState } from "react";
import SingleInterview from "./SingleInterview";
import useSignalInterview from "../../Hooks/interview/useSignalInterview";
import { useParams } from "react-router";

const UpdateInterview = () => {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const { fetchSingleInterview, data, loading, error } = useSignalInterview(id);

  useEffect(() => {
    fetchSingleInterview();
  }, [refresh]); // Add refresh as a dependency

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger data fetch
  };

  return (
    <div className="relative">
      <div className="  w-full flex justify-between flex-col md:flex-row gap-4 ">
        {/* AllInterview Container */}
        <div className=" w-full h-[540px] rounded-lg shadow-lg overflow-y-auto m-4 ">
          <p className="sticky top-0 bg-pink-600 px-4 h-12 py-2 text-white font-bold text-2xl text-center w-full z-10">
            Interview List
          </p>
          <div>
            <SingleInterview
              data={data}
              loading={loading}
              error={error}
              onUpdate={handleRefresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInterview;
