import express from "express";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
} from "./students.controller.js";

const route = express.Router();

route.post("/create", createStudent);
route.get("/get-one/:id", getSingleStudent);
route.get("/all-student", getAllStudent);
route.patch("/update-student/:id", updateStudent);
route.delete("/delete-student/:id", deleteStudent);

export default route;
