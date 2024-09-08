import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Students from "./Pages/Students";
import Interview from "./Pages/Interview";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./App.css"; // Import your CSS file for additional styles
import DownloadReport from "./Components/DownloadReport";
import CreateInterview from "./Components/Interview/CreateInterview";
import { Toaster } from "react-hot-toast";
import UpdateStudent from "./Components/Students/UpdateStudent";
import UpdateInterview from "./Components/Interview/UpdateInterview";
import CreateStudent from "./Components/Students/CreateStudent";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header: Fixed at the top */}
      <Header className="fixed top-0 left-0 w-full z-10 bg-white" />

      {/* Toaster notification */}
      <Toaster />

      {/* Main content: Adjusted padding to account for fixed header/footer */}
      <main className="flex-grow   overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<Students />} />
          <Route path="/interview" element={<Interview />} />
          {/* Child routes under /interview */}
          <Route path="/create-interview" element={<CreateInterview />} />
          <Route path="/update-interview/:id" element={<UpdateInterview />} />

          <Route path="/update-student/:id" element={<UpdateStudent />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/report" element={<DownloadReport />} />
        </Routes>
      </main>

      {/* Footer: Fixed at the bottom */}
      <Footer className="fixed bottom-0 left-0 w-full z-10 bg-white" />
    </div>
  );
};

export default App;
