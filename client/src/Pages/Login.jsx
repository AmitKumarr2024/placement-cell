import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // State to manage form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Login successful");
        navigate('/')
      } else {
        toast.error(dataResponse.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 border-4 border-green-500 rounded-lg shadow-lg">
        <h2 className="text-5xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Password
            </label>
            <div className="rounded-md p-2 flex items-center border">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="pr-2 w-full h-full outline-none bg-transparent"
              />
              <div
                className="cursor-pointer text-2xl"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
        <p className="text-indigo-500 font-semibold text-base text-center mt-9">
          <Link to={"/signup"}>Don't have an account? Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
