import { pool } from "../db.js";

// se alle teachers i databasen
export async function getAllTeachers() {
  //vi awaiter en query der henter alle rækker fra teachers tabellen
  const result = await pool.query("SELECT * FROM hogwarts_course.teachers");

  //returner alle rækkerne til controlleren
  return result.rows;
}

//se fx. teacher med id 1
export async function getTeacherById(id) {
  //vi awaiter en query der henter teacheren med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.teachers WHERE id = $1",
    [id],
  );

  //returner den første række, hvis der ikke er nogen bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//opret en teacher
export async function createTeacher(name, fk_houses) {
  //vi indsætter name og fk_houses i teachers tabellen ($1 = name, $2 = fk_houses)
  //RETURNING * gør at vi får den nye teacher tilbage med id
  const result = await pool.query(
    `INSERT INTO hogwarts_course.teachers (name, fk_houses)
     VALUES ($1, $2)
     RETURNING *`,
    [name, fk_houses],
  );

  //returner den nye teacher til controlleren
  return result.rows[0];
}

//updater en teacher
export async function updateTeacher(id, name, fk_houses) {
  //vi opdaterer name og fk_houses på teacheren med det id ($1 = name, $2 = fk_houses, $3 = id)
  //RETURNING * gør at vi får den opdaterede teacher tilbage
  const result = await pool.query(
    `UPDATE hogwarts_course.teachers SET name = $1, fk_houses = $2
     WHERE id = $3
     RETURNING *`,
    [name, fk_houses, id],
  );

  //returner den opdaterede teacher, hvis id ikke findes bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//slet/fjern en teacher
export async function deleteTeacher(id) {
  //vi sletter teacheren med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "DELETE FROM hogwarts_course.teachers WHERE id = $1",
    [id],
  );

  //returner antal slettede rækker, hvis 0 fandtes teacheren ikke og controlleren sender 404
  return result.rowCount;
}
