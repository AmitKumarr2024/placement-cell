import React from "react";
import EditBox from "./EditBox";
import AllStudent from "./AllStudent";
import useAllStudents from "../../Hooks/useAllStudents";

const CreateStudent = () => {
  // Use the custom hook to fetch student data
  const { students, loading, error, fetchStudents } = useAllStudents();

  return (
    <div className=" w-full h-[579px] flex-grow flex-shrink flex flex-col p-4 bg-slate-200">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        {/* EditBox Container */}
        <div className="relative w-full md:w-[45%] h-[650px] md:h-[490px]  border overflow-y-auto flex flex-wrap gap-2 p-1 ">
       <p className="sticky top-0 bg-pink-600 px-4 my-auto py-2 text-white font-bold text-2xl text-center w-full">Create Student</p>
          <EditBox fetchStudents={fetchStudents} />
        </div>

        {/* AllStudent Container */}
        <div className="relative w-full md:w-[55%] h-[550px] border overflow-y-auto flex flex-wrap gap-2 p-1 outline-none">
          <p className="sticky top-0 bg-pink-600 px-4 py-2 text-white font-bold text-2xl text-center w-full">Student List</p>
          <div className="px-1">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <AllStudent students={students} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
