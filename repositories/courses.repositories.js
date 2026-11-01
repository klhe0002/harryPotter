import { pool } from "../db.js";

// se alle courses i databasen
export async function getAllCourses() {
  //vi awaiter en query der henter alle rækker fra courses tabellen
  const result = await pool.query("SELECT * FROM hogwarts_course.courses");

  //returner alle rækkerne til controlleren
  return result.rows;
}

// course med dens teacher og students
export async function getCourseById(id) {
  //vi henter coursen med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.courses WHERE id = $1",
    [id],
  );
  //vi tager den første række, hvis der ikke er nogen er course undefined
  const course = result.rows[0];

  //hvis der ikke er en course så returner undefined, så controlleren kan sende 404
  if (!course) return undefined;

  //vi henter teacheren til coursen ud fra coursens fk_teachers
  const teacher = await pool.query(
    "SELECT * FROM hogwarts_course.teachers WHERE id = $1",
    [course.fk_teachers],
  );
  //vi henter alle students på coursen ved at joine students med student_course, sorteret efter id
  const students = await pool.query(
    `SELECT s.* FROM hogwarts_course.students s
     JOIN hogwarts_course.student_course sc ON sc.fk_student = s.id
     WHERE sc.fk_course = $1
     ORDER BY s.id`,
    [id],
  );

  //vi lægger teacheren og listen af students ind på course objektet
  course.teacher = teacher.rows[0];
  course.students = students.rows;

  //returner coursen med dens teacher og students
  return course;
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
