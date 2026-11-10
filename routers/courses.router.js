import express from "express";

import * as coursesController from "../controllers/courses.controller.js";

const courseRouter = express.Router();

/////// courses ///////
//get courses
courseRouter.get("/", coursesController.getAllCourses);

//get single course
courseRouter.get("/:id", coursesController.getCourseById);

//create course
courseRouter.post("/", coursesController.createCourse);

//update course (kun navn)
courseRouter.put("/:id", coursesController.updateCourseName);

//delete course
courseRouter.delete("/:id", coursesController.deleteCourse);

//update course teacher
courseRouter.put("/:id/teacher", coursesController.updateCourseTeacher);

//add student to course
courseRouter.post("/:id/students", coursesController.addStudentToCourse);

//remove student from course
courseRouter.delete(
  "/:id/students/:studentId",
  coursesController.removeStudentFromCourse,
);

export default courseRouter;
