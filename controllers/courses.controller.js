import * as coursesRepositories from "../repositories/courses.repository.js";

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
  const { name, fk_teachers } = req.body;
  const course = await coursesRepositories.createCourse(name, fk_teachers);
  res.status(201).json(course);
}

export async function updateCourseName(req, res) {
  const { name } = req.body;
  const course = await coursesRepositories.updateCourseName(
    req.params.id,
    name,
  );
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json(course);
}

export async function deleteCourse(req, res) {
  const deleted = await coursesRepositories.deleteCourse(req.params.id);
  if (deleted === 0)
    return res.status(404).json({ error: "Course not found" });
  res.sendStatus(204);
}

export async function updateCourseTeacher(req, res) {
  const { fk_teachers } = req.body;
  const course = await coursesRepositories.updateCourseTeacher(
    req.params.id,
    fk_teachers,
  );
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json(course);
}

export async function addStudentToCourse(req, res) {
  const { fk_student } = req.body;
  const enrollment = await coursesRepositories.addStudentToCourse(
    req.params.id,
    fk_student,
  );
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
