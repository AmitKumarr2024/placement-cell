import React from "react";
import useAllStudents from "../../Hooks/useAllStudents";
import { Link } from "react-router-dom";

const StudentList = () => {
  const { students } = useAllStudents();
  return (
    <div className=" p-4 h-96 overflow-y-auto">
      {students.length > 0
        ? students.map((item, index) => (
            <div className="flex flex-row justify-center">
              <input type="checkbox" value={item?._id} className="p-36 w-5" />
              {console.log(item?._id)
              }
              <Link
                to={`/update-student/${item._id}`}
                key={index}
                className={`md:w-96 card bg-base-100 w-full  my-4 inline-block shadow-2xl ${
                  item.status === "Pass" ? "bg-green-500" : "bg-red-600"
                } ${item.status === "Pending" ? "bg-yellow-400" : "null"} ${
                  item.status === "Cancel" ? "bg-white" : "null"
                }  rounded-lg mx-11`}
              >
                <div className="card-body p-4 rounded-lg flex items-center justify-between">
                  <h2 className="card-title capitalize font-bold text-2xl line-clamp-1">
                    {item.fullName}
                  </h2>

                  <p className="font-semibold">Status : {item.status}</p>

                  <div className="card-actions justify-end"></div>
                </div>
              </Link>
            </div>
          ))
        : "No students found."}
    </div>
  );
};

export default StudentList;
