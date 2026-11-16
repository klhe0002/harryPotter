import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query("SELECT * FROM hogwarts_course.students");

  return result.rows;
}

export async function getStudentById(id) {
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.students WHERE id = $1",
    [id],
  );

  return result.rows[0];
}

export async function createStudent(name, year, fk_houses) {
  const result = await pool.query(
    `INSERT INTO hogwarts_course.students (name, year, fk_houses)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, year, fk_houses],
  );

  return result.rows[0];
}

export async function updateStudent(id, name, year, fk_houses) {
  const result = await pool.query(
    `UPDATE hogwarts_course.students SET name = $1, year = $2, fk_houses = $3
     WHERE id = $4
     RETURNING *`,
    [name, year, fk_houses, id],
  );

  return result.rows[0];
}

export async function deleteStudent(id) {
  const result = await pool.query(
    "DELETE FROM hogwarts_course.students WHERE id = $1",
    [id],
  );

  return result.rowCount;
}
