import { pool } from "../db.js";

export async function getAllGrades() {
  const result =
    await pool.query(/*sql*/ `select grades.letter, grades.name, grades.description
                              , grades.passed
                              from hogwarts_course.grades
                              `);

  return result.rows;
}

export async function getGradesByLetter(letter) {
  const result = await pool.query(
    /*sql*/ `select grades.*
                              from hogwarts_course.grades
            
                              where hogwarts_course.grades.letter = $1;`,
    [letter],
  );

  return result.rows[0];
}
