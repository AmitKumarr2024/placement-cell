import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Checks if token exists
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token"); // Clear the token from localStorage
      setIsAuthenticated(false); // Update authentication state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Function to trigger download of the student report
  const downloadReport = () => {
    fetch("/api/report/download-report", {
      method: "GET",
      headers: {
        "Content-Type": "application/csv",
        "Authorization": `Bearer ${localStorage.getItem("token")}` // Add auth token if needed
      }
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students_interviews_report.csv';
        a.click();
      })
      .catch(error => {
        console.error("Error downloading report:", error);
      });
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-blue-400 p-4 hidden lg:flex">
        <div className="container mx-auto flex items-center justify-between h-8">
          <div className="text-white font-semibold text-2xl">
            <Link to="/">Home</Link>
          </div>
          <nav>
            <ul className="flex items-center font-semibold text-xl space-x-9">
              <li>
                <Link to="/create-student" className="text-white hover:text-gray-200">
                  New Student
                </Link>
              </li>
              <li>
                <Link
                  to="/create-interview"
                  className="text-white hover:text-gray-200"
                >
                  New Interview
                </Link>
              </li>
              <li>
                <button
                  onClick={downloadReport}
                  className="text-white hover:text-gray-200"
                >
                  Download Report
                </button>
              </li>
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={logout}
                    className="text-white hover:text-gray-200"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-white hover:text-gray-200">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-white hover:text-gray-200">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <button
          onClick={toggleSidebar}
          className="p-4 bg-blue-400 text-white w-full flex items-center justify-between"
        >
          <Link to="/">Home</Link>
          <IoMenu size={30} />
        </button>

        <div
          className={`fixed inset-y-0 right-0 bg-blue-400 z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out w-2/4`}
        >
          <button
            onClick={toggleSidebar}
            className="p-4 text-white w-full flex justify-end"
          >
            <IoMdClose size={30} />
          </button>
          <nav className="flex flex-col items-center mt-2">
            <Link
              to="/create-student"
              className="text-white text-base py-2"
              onClick={toggleSidebar}
            >
              New Student
            </Link>
            <Link
              to="/create-interview"
              className="text-white text-base py-2"
              onClick={toggleSidebar}
            >
              New Interview
            </Link>
            <button
              onClick={downloadReport}
              className="text-white text-base py-2"
              
            >
              Download Report
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  toggleSidebar();
                }}
                className="text-white text-base py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white text-base py-2"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white text-base py-2"
                  onClick={toggleSidebar}
                >
                  Signup
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
