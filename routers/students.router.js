import express from "express";

import * as studentsController from "../controllers/students.controller.js";

const studentRouter = express.Router();

/////// students ///////
//get students
studentRouter.get("/", studentsController.getAllStudents);

//get single student
studentRouter.get("/:id", studentsController.getStudentById);

//create student
studentRouter.post("/", studentsController.createStudent);

//update student
studentRouter.put("/:id", studentsController.updateStudent);

//delete student
studentRouter.delete("/:id", studentsController.deleteStudent);

export default studentRouter;
