import { pool } from "../db.js";

export async function getAllExams() {
  const result = await pool.query(/*sql*/ `select exams.id,
    courses.name as course,
    students.name as student,
    exams.fk_grade as grade
    from hogwarts_course.exams
    left join hogwarts_course.courses on exams.fk_course = courses.id
    left join hogwarts_course.students on exams.fk_student = students.id
    order by exams.id`);

  return result.rows;
}

export async function getExamById(id) {
  const result = await pool.query(
    /*sql*/ `select exams.id,
    courses.name as course,
    students.name as student,
    exams.fk_grade as grade
    from hogwarts_course.exams
    left join hogwarts_course.courses on exams.fk_course = courses.id
    left join hogwarts_course.students on exams.fk_student = students.id
    where exams.id = $1`,
    [id],
  );

  return result.rows[0];
}

export async function createExam(exam) {
  const result = await pool.query(
    /*sql*/ `INSERT INTO hogwarts_course.exams (fk_course, fk_student, fk_grade)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [exam.fk_course, exam.fk_student, exam.fk_grade],
  );

  return getExamById(result.rows[0].id);
}

export async function updateExam(exam) {
  const result = await pool.query(
    /*sql*/ `UPDATE hogwarts_course.exams
     SET fk_course = $1, fk_student = $2, fk_grade = $3
     WHERE id = $4
     RETURNING id`,
    [exam.fk_course, exam.fk_student, exam.fk_grade, exam.id],
  );

  if (!result.rows[0]) return undefined;

  const updatedId = result.rows[0].id;
  return getExamById(updatedId);
}

export async function deleteExam(id) {
  const result = await pool.query(
    "DELETE FROM hogwarts_course.exams WHERE id = $1",
    [id],
  );

  return result.rowCount;
}
