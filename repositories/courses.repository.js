import { pool } from "../db.js";

export async function getAllCourses() {
  const result = await pool.query("SELECT * FROM hogwarts_course.courses");

  return result.rows;
}

export async function getCourseById(id) {
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.courses WHERE id = $1",
    [id],
  );

  return result.rows[0];
}

export async function createCourse(name, fk_teachers) {
  const result = await pool.query(
    `INSERT INTO hogwarts_course.courses (name, fk_teachers)
     VALUES ($1, $2)
     RETURNING *`,
    [name, fk_teachers],
  );

  return result.rows[0];
}

export async function updateCourseName(id, name) {
  const result = await pool.query(
    `UPDATE hogwarts_course.courses SET name = $1
     WHERE id = $2
     RETURNING *`,
    [name, id],
  );

  return result.rows[0];
}

export async function deleteCourse(id) {
  const result = await pool.query(
    "DELETE FROM hogwarts_course.courses WHERE id = $1",
    [id],
  );

  return result.rowCount;
}

export async function updateCourseTeacher(id, fk_teachers) {
  const result = await pool.query(
    `UPDATE hogwarts_course.courses SET fk_teachers = $1
     WHERE id = $2
     RETURNING *`,
    [fk_teachers, id],
  );

  return result.rows[0];
}

export async function addStudentToCourse(courseId, studentId) {
  const result = await pool.query(
    `INSERT INTO hogwarts_course.student_course (fk_student, fk_course)
     VALUES ($1, $2)
     RETURNING *`,
    [studentId, courseId],
  );

  return result.rows[0];
}

export async function removeStudentFromCourse(courseId, studentId) {
  const result = await pool.query(
    `DELETE FROM hogwarts_course.student_course
     WHERE fk_course = $1 AND fk_student = $2`,
    [courseId, studentId],
  );

  return result.rowCount;
}
