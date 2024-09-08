import React from "react";
import Students from "./Students";
import Interview from "./Interview";

const Home = () => {
  return (
    <div className="w-full  p-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative w-full md:w-[85%] h-[400px] md:h-[540px] border-2 rounded-md border-gray-500 overflow-hidden overflow-y-auto">
          <p className="sticky top-0 text-2xl text-center font-bold capitalize bg-blue-600 text-white p-2">
            Students
          </p>
          <div className="mx-6">

          <Students />
          </div>
        </div>
        <div className="relative w-full md:w-[30%] h-[400px] md:h-[540px] border-2 rounded-md border-gray-500 overflow-hidden overflow-y-auto">
          <p className="z-10 sticky top-0 text-2xl text-center font-bold capitalize bg-blue-600 text-white p-2">
            Interviews
          </p>
          <div>

          <Interview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
