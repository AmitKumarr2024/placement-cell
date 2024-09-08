import React from "react";

const SingleStudent = ({ input }) => {
  return (
    <div className="">
      {input ? (
        <div
          className={`md:w-[450px] md:h-[450px] card bg-base-100 w-full  my-4 inline-block shadow-2xl ${
            input.status === "Pass" ? "bg-green-500" : "bg-red-800"
          } ${input.status === "Pending" ? "bg-yellow-400" : "null"} ${
            input.status === "Cancel" ? "bg-white" : "null"
          } rounded-lg mx-2`}
        >
          <div className="card-body p-4 rounded-lg ">
            <h2 className="card-title capitalize font-bold text-2xl line-clamp-1">
              {input.fullName}
            </h2>
            <p className="line-clamp-1">Email : {input.email}</p>
            <p>RollNo : {input.rollNo}</p>
            <p>Gender : {input.gender}</p>
            <p className="line-clamp-1">College : {input.collegeName}</p>
            <p>Status : {input.status}</p>
            <p>DSA score : {input.dsaScore}</p>
            <p>React Dev score : {input.reactDevScore}</p>
            <p>Web Dev score : {input.webDevScore}</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      ) : (
        "No students found."
      )}
    </div>
  );
};

export default SingleStudent;
