import React from "react";
import { Link } from "react-router-dom";
import useAllStudents from "../../Hooks/useAllStudents";

const AllStudent = () => {
  const { students, loading, error } = useAllStudents(); // Use the hook to get data

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {students.length > 0 ? (
        students.map((item, index) => (
          <Link
            to={`/update-student/${item._id}`}
            key={index}
            className={`md:w-60 card bg-base-100 w-80  my-4 inline-block shadow-2xl ${item.status === "Pass" ?"bg-green-500":"bg-red-600" } ${item.status==='Pending'?"bg-yellow-400":'null'} ${item.status==='Cancel'?"bg-white":'null'}  rounded-lg mx-2`}
          >
            <div className="card-body p-4 rounded-lg ">
              <h2 className="card-title capitalize font-bold text-2xl line-clamp-1">
                {item.fullName}
              </h2>
              <p className="line-clamp-1">Email : {item.email}</p>
              <p>RollNo : {item.rollNo}</p>
              <p>Gender : {item.gender}</p>
              <p className="line-clamp-1">College : {item.collegeName}</p>
              <p>Status : {item.status}</p>
              <p>DSA score : {item.dsaScore}</p>
              <p>React Dev score : {item.reactDevScore}</p>
              <p>Web Dev score : {item.webDevScore}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </Link>
        ))
      ) : (
        "No students found."
      )}
    </div>
  );
};

export default AllStudent;
