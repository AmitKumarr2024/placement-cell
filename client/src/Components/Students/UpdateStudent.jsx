import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SingleStudent from "./SingleStudent";
import useUpdateStudent from "../../Hooks/useUpdateStudent";
import UpdateBox from "./UpdateBox";
import AllInterview from "../../Components/Interview/allInterview";

const UpdateStudent = () => {
  const { id } = useParams();

  const [input, setInput] = useState({});
  const { updateStudent, loading, error, success } = useUpdateStudent(id);

  // Fetch single student data
  const fetchSingleStudent = async () => {
    try {
      const response = await fetch(`/api/students/get-one/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setInput(dataResponse.data);
      } else {
        toast.error(`Error fetching student: ${dataResponse.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching student: ${error.message}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleStudent();
    }
  }, [id]);

  useEffect(() => {
    if (success) {
      toast.success("Student updated successfully!");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(`Update failed: ${error}`);
    }
  }, [error]);

  // Handle save button click
  const handleSave = async () => {
    try {
      const result = await updateStudent(input);
      if (result) {
        // Additional handling if needed
      }
    } catch (error) {
      toast.error(`Error updating student: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-[579px] flex-grow flex-shrink  p-4 bg-slate-200">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        {/* UpdateBox Container */}
        <div className="relative w-full md:w-[45%] h-96 md:h-[490px] border overflow-y-auto flex flex-wrap gap-2 p-1">
          <p className="sticky top-0 bg-pink-600 px-4 my-auto py-2 text-white font-bold text-2xl text-center w-full">
            Update Student
          </p>
          <UpdateBox input={input} setInput={setInput} handleSave={handleSave} />
        </div>

        {/* SingleStudent Container */}
        <div className="relative w-full md:w-[55%] h-full border-2 bg-white overflow-y-auto flex flex-wrap gap-2 p-1 outline-none">
          <p className="sticky top-0 bg-pink-600 px-4 text-white font-bold text-2xl text-center w-full h-9">
            Student List
          </p>
          <div className="px-1 overflow-y-auto">
            <SingleStudent input={input} />
          </div>
        </div>
        {/* company taken interview */}
        <div className="relative w-full md:w-[55%] h-full border-2 bg-white overflow-y-auto flex flex-wrap gap-2 p-1 outline-none">
          <p className="sticky top-0 bg-indigo-600 px-4 text-white font-bold text-2xl text-center w-full h-9">
            Company Interview
          </p>
          <div className="px-1 mx-auto ">
            <AllInterview/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
