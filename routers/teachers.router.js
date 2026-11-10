import express from "express";

import * as teachersController from "../controllers/teachers.controller.js";

const teacherRouter = express.Router();

/////// teachers ///////
//get teachers
teacherRouter.get("/", teachersController.getAllTeachers);

//get single teacher
teacherRouter.get("/:id", teachersController.getTeacherById);

//create teacher
teacherRouter.post("/", teachersController.createTeacher);

//update teacher
teacherRouter.put("/:id", teachersController.updateTeacher);

//delete teacher
teacherRouter.delete("/:id", teachersController.deleteTeacher);

export default teacherRouter;
