import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path'

import connectToMongoDb from "./config/mongodb.js";
import UserRoute from "./components/users/user.route.js";
import StudentRoute from "./components/students/students.route.js";
import InterviewRoute from "./components/interview/interview.route.js";
import ReportRoute from "./components/report/report.route.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5006;
const app = new express();


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Client", "dist", "index.html"));
});

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Restrict to your frontend's URL
  credentials: true, // Enable sending of cookies with CORS
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", UserRoute);
app.use("/api/students", StudentRoute);
app.use("/api/interview", InterviewRoute);
app.use("/api/report", ReportRoute);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log("Server started succcessfully :", PORT);
});
