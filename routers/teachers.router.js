import express from "express";

import * as teachersController from "../controllers/teachers.controller.js";

const teacherRouter = express.Router();

teacherRouter.get("/", teachersController.getAllTeachers);

teacherRouter.get("/:id", teachersController.getTeacherById);

teacherRouter.post("/", teachersController.createTeacher);

teacherRouter.put("/:id", teachersController.updateTeacher);

teacherRouter.delete("/:id", teachersController.deleteTeacher);

export default teacherRouter;
