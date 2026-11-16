import { pool } from "../db.js";

export async function getAllCourses() {
  const result = await pool.query(/*sql*/ `SELECT courses.id,
    courses.name,
    teachers.name as teacher,
    courses.type,
    courses.level,
    courses.school_year
    from hogwarts_course.courses
    left join hogwarts_course.teachers
    on courses.fk_teachers = teachers.id
    order by courses.id`);

  return result.rows;
}

export async function getCourseById(id) {
  const result = await pool.query(
    /*sql*/ `select courses.*, teachers.name as teacher
    from hogwarts_course.courses
    left join hogwarts_course.teachers
    on courses.fk_teachers = teachers.id
    where courses.id = $1`,
    [id],
  );

  return result.rows[0];
}

export async function createCourse(course) {
  const result = await pool.query(
    /*sql*/ `INSERT INTO hogwarts_course.courses (name, fk_teachers, type, level, school_year)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [
      course.name,
      course.fk_teachers,
      course.type,
      course.level,
      course.school_year,
    ],
  );

  return getCourseById(result.rows[0].id);
}

export async function updateCourse(course) {
  const result = await pool.query(
    /*sql*/ `UPDATE hogwarts_course.courses
     SET name = $1, fk_teachers = $2, type = $3, level = $4, school_year = $5
     WHERE id = $6
     RETURNING id`,
    [
      course.name,
      course.fk_teachers,
      course.type,
      course.level,
      course.school_year,
      course.id,
    ],
  );

  if (!result.rows[0]) return undefined;

  return getCourseById(result.rows[0].id);
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
