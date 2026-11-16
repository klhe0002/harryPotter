import * as coursesRepositories from "../repositories/courses.repository.js";
import {
  CreateCourseDto,
  UpdatedCourseDto,
  UpdateCourseTeacherDto,
  AddStudentToCourseDto,
} from "../dtos/courses.dto.js";

export async function getAllCourses(req, res) {
  const allCourses = await coursesRepositories.getAllCourses();
  res.json(allCourses);
}

export async function getCourseById(req, res) {
  const course = await coursesRepositories.getCourseById(req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json(course);
}

export async function createCourse(req, res) {
  const newCourse = CreateCourseDto.parse(req.body);

  const course = await coursesRepositories.createCourse(newCourse);

  res.status(201).json(course);
}

export async function updateCourse(req, res) {
  const input = { ...req.body, id: Number(req.params.id) };
  const updatedCourse = UpdatedCourseDto.parse(input);

  const course = await coursesRepositories.updateCourse(updatedCourse);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json(course);
}

export async function deleteCourse(req, res) {
  const deleted = await coursesRepositories.deleteCourse(req.params.id);
  if (deleted === 0) return res.status(404).json({ error: "Course not found" });
  res.sendStatus(204);
}

export async function updateCourseTeacher(req, res) {
  const input = { ...req.body, id: Number(req.params.id) };
  const courseTeacher = UpdateCourseTeacherDto.parse(input);

  const course = await coursesRepositories.updateCourseTeacher(courseTeacher);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json(course);
}

export async function addStudentToCourse(req, res) {
  const input = { ...req.body, fk_course: Number(req.params.id) };
  const newEnrollment = AddStudentToCourseDto.parse(input);

  const enrollment = await coursesRepositories.addStudentToCourse(newEnrollment);
  res.status(201).json(enrollment);
}

export async function removeStudentFromCourse(req, res) {
  const removed = await coursesRepositories.removeStudentFromCourse(
    req.params.id,
    req.params.studentId,
  );
  if (removed === 0)
    return res.status(404).json({ error: "Student not on course" });
  res.sendStatus(204);
}
