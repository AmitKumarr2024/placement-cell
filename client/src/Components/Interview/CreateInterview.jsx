import React, { useState } from "react";
import CreateBox from "./CreateBox";
import AllInterview from "./allInterview";

const CreateInterview = () => {
  const [refresh, setRefresh] = useState(false);

  // Function to trigger data refresh
  const handleRefresh = () => setRefresh(prev => !prev);

  return (
    <div className="w-full h-full flex-grow flex-shrink flex flex-col">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        {/* CreateBox Container */}
        <div className="relative w-full md:w-[45%] h-[650px] md:h-[490px] border rounded-lg shadow-lg overflow-y-auto m-4">
          <p className="sticky top-0 bg-pink-600 px-4 h-12 py-2 text-white font-bold text-2xl text-center w-full">
            Create Interview
          </p>
          <div className="p-4">
            {/* Pass handleRefresh to trigger re-fetch */}
            <CreateBox onSuccess={handleRefresh} />
          </div>
        </div>

        {/* AllInterview Container */}
        <div className="relative w-full md:w-[55%] h-[60vh] md:h-[490px] rounded-lg shadow-lg overflow-y-auto m-4">
          <p className="sticky top-0 bg-pink-600 px-4 h-12 py-2 text-white font-bold text-2xl text-center w-full z-10">
            Interview List
          </p>
          <div className="p-4">
            {/* Pass refresh state to AllInterview */}
            <AllInterview onSuccess={handleRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterview;
