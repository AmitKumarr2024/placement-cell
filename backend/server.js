import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

import connectToMongoDb from "./config/mongodb.js";
import UserRoute from "./components/users/user.route.js";
import StudentRoute from "./components/students/students.route.js";
import InterviewRoute from "./components/interview/interview.route.js";
import ReportRoute from "./components/report/report.route.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5006;
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// Routes
app.use("/api/users", UserRoute);
app.use("/api/students", StudentRoute);
app.use("/api/interview", InterviewRoute);
app.use("/api/report", ReportRoute);

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  connectToMongoDb();
  console.log("Server started successfully on port :", PORT);
});
