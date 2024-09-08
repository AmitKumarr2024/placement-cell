import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditBox = ({ fetchStudents,}) => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    collegeName: "",
    status: "",
    gender: "",
    dsaScore: "",
    webDevScore: "",
    reactDevScore: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/students/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        // Clear the form
        setInput({
          fullName: "",
          email: "",
          rollNo: "",
          collegeName: "",
          status: "",
          gender: "",
          dsaScore: "",
          webDevScore: "",
          reactDevScore: "",
        });

        toast.success("Student successfully added!");

        // Fetch the updated list of students
        fetchStudents();
      } else {
        const errorText = await response.json();
        toast.error(`Error: ${errorText.message}`);
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md relative h-full md:h-96">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        onSubmit={handleSubmit}
      >
        {/* Input Fields */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={input.fullName || ""}
            onChange={handleChange}
            placeholder="Enter Student name"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={input.email || ""}
            onChange={handleChange}
            placeholder="Enter Email"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">
            Roll No
          </label>
          <input
            type="text"
            name="rollNo"
            value={input.rollNo || ""}
            onChange={handleChange}
            placeholder="Enter Roll No"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            name="gender"
            value={input.gender || ""}
            onChange={handleChange}
            className="block w-full p-1 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
            College Name
          </label>
          <input
            type="text"
            name="collegeName"
            value={input.collegeName || ""}
            onChange={handleChange}
            placeholder="Enter College Name"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            type="status"
            name="status"
            value={input.status || ""}
            onChange={handleChange}
           
            className="block w-full p-1 border border-gray-300 rounded-md"
          >
            <option value="">Enter Status</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
            <option value="Pending">Pending</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>
        <div>
          <label htmlFor="dsaScore" className="block text-sm font-medium text-gray-700">
            DSA Score
          </label>
          <input
            type="number"
            name="dsaScore"
            value={input.dsaScore || ""}
            onChange={handleChange}
            placeholder="Enter DSA Score"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="reactDevScore" className="block text-sm font-medium text-gray-700">
            React Dev Score
          </label>
          <input
            type="number"
            name="reactDevScore"
            value={input.reactDevScore || ""}
            onChange={handleChange}
            placeholder="Enter React Dev Score"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="webDevScore" className="block text-sm font-medium text-gray-700">
            Web Dev Score
          </label>
          <input
            type="number"
            name="webDevScore"
            value={input.webDevScore || ""}
            onChange={handleChange}
            placeholder="Enter Web Dev Score"
            className="block w-full p-1 border border-gray-300 rounded-md"
          />
        </div>
      </form>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white md:px-32 py-2 px-1 text-xl rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBox;
