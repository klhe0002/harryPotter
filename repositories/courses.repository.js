import { pool } from "../db.js";

// se alle courses i databasen
export async function getAllCourses() {
  //vi awaiter en query der henter alle rækker fra courses tabellen
  const result = await pool.query("SELECT * FROM hogwarts_course.courses");

  //returner alle rækkerne til controlleren
  return result.rows;
}

// se en enkelt course
export async function getCourseById(id) {
  //vi henter coursen med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.courses WHERE id = $1",
    [id],
  );

  //noget med join her men ved ikke hvordan

  //returner coursen, hvis id ikke findes bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//opret en course
export async function createCourse(name, fk_teachers) {
  //vi indsætter name og fk_teachers i courses tabellen ($1 = name, $2 = fk_teachers)
  //RETURNING * gør at vi får den nye course tilbage med id
  const result = await pool.query(
    `INSERT INTO hogwarts_course.courses (name, fk_teachers)
     VALUES ($1, $2)
     RETURNING *`,
    [name, fk_teachers],
  );

  //returner den nye course til controlleren
  return result.rows[0];
}

// update kan kun ændre navn
export async function updateCourseName(id, name) {
  //vi opdaterer kun name på coursen med det id ($1 = name, $2 = id)
  //RETURNING * gør at vi får den opdaterede course tilbage
  const result = await pool.query(
    `UPDATE hogwarts_course.courses SET name = $1
     WHERE id = $2
     RETURNING *`,
    [name, id],
  );

  //returner den opdaterede course, hvis id ikke findes bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//slet/fjern en course
export async function deleteCourse(id) {
  //vi sletter coursen med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "DELETE FROM hogwarts_course.courses WHERE id = $1",
    [id],
  );

  //returner antal slettede rækker, hvis 0 fandtes coursen ikke og controlleren sender 404
  return result.rowCount;
}

//updater teacheren på en course
export async function updateCourseTeacher(id, fk_teachers) {
  //vi opdaterer fk_teachers på coursen med det id ($1 = fk_teachers, $2 = id)
  //RETURNING * gør at vi får den opdaterede course tilbage
  const result = await pool.query(
    `UPDATE hogwarts_course.courses SET fk_teachers = $1
     WHERE id = $2
     RETURNING *`,
    [fk_teachers, id],
  );

  //returner den opdaterede course, hvis id ikke findes bliver det undefined og controlleren sender 404
  return result.rows[0];
}

//tilføj en student til en course
export async function addStudentToCourse(courseId, studentId) {
  //vi indsætter en ny række i student_course som kobler studenten og coursen sammen ($1 = studentId, $2 = courseId)
  //RETURNING * gør at vi får den nye række tilbage
  const result = await pool.query(
    `INSERT INTO hogwarts_course.student_course (fk_student, fk_course)
     VALUES ($1, $2)
     RETURNING *`,
    [studentId, courseId],
  );

  //returner den nye række (enrollment) til controlleren
  return result.rows[0];
}

//fjern en student fra en course
export async function removeStudentFromCourse(courseId, studentId) {
  //vi sletter rækken i student_course hvor både course id og student id passer ($1 = courseId, $2 = studentId)
  const result = await pool.query(
    `DELETE FROM hogwarts_course.student_course
     WHERE fk_course = $1 AND fk_student = $2`,
    [courseId, studentId],
  );

  //returner antal slettede rækker, hvis 0 var studenten ikke på coursen og controlleren sender 404
  return result.rowCount;
}
