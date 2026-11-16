import express from "express";

import * as coursesController from "../controllers/courses.controller.js";

const courseRouter = express.Router();

courseRouter.get("/", coursesController.getAllCourses);

courseRouter.get("/:id", coursesController.getCourseById);

courseRouter.post("/", coursesController.createCourse);

courseRouter.put("/:id", coursesController.updateCourse);

courseRouter.delete("/:id", coursesController.deleteCourse);

courseRouter.put("/:id/teacher", coursesController.updateCourseTeacher);

courseRouter.post("/:id/students", coursesController.addStudentToCourse);

courseRouter.delete(
  "/:id/students/:studentId",
  coursesController.removeStudentFromCourse,
);

export default courseRouter;
