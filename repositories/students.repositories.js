import { pool } from "../db.js";

// se alle students i databasen
export async function getAllStudents() {
  //vi awaiter en query der henter alle rækker fra students tabellen
  const result = await pool.query("SELECT * FROM hogwarts_course.students");

  //returner alle rækkerne til controlleren
  return result.rows;
}

//se fx. student med id 1
export async function getStudentById(id) {
  //vi awaiter en query der henter studenten med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.students WHERE id = $1",
    [id],
  );

  //returner den første række, hvis der ikke er nogen bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//opret en student
export async function createStudent(name, year, fk_houses) {
  //vi indsætter name, year og fk_houses i students tabellen ($1 = name, $2 = year, $3 = fk_houses)
  //RETURNING * gør at vi får den nye student tilbage med id
  const result = await pool.query(
    `INSERT INTO hogwarts_course.students (name, year, fk_houses)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, year, fk_houses],
  );

  //returner den nye student til controlleren
  return result.rows[0];
}

//updater en student
export async function updateStudent(id, name, year, fk_houses) {
  //vi opdaterer name, year og fk_houses på studenten med det id ($1 = name, $2 = year, $3 = fk_houses, $4 = id)
  //RETURNING * gør at vi får den opdaterede student tilbage
  const result = await pool.query(
    `UPDATE hogwarts_course.students SET name = $1, year = $2, fk_houses = $3
     WHERE id = $4
     RETURNING *`,
    [name, year, fk_houses, id],
  );

  //returner den opdaterede student, hvis id ikke findes bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//slet/fjern en student
export async function deleteStudent(id) {
  //vi sletter studenten med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "DELETE FROM hogwarts_course.students WHERE id = $1",
    [id],
  );

  //returner antal slettede rækker, hvis 0 fandtes studenten ikke og controlleren sender 404
  return result.rowCount;
}
