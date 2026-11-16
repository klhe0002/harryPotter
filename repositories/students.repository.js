import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query(/*sql*/ `SELECT students.id, 
    students.name, 
    students.school_year, 
    houses.name as house, 
    students.birthday
    from hogwarts_course.students
    left join hogwarts_course.houses 
    on students.fk_houses = houses.id`);

  return result.rows;
}

export async function getStudentById(id) {
  const result = await pool.query(
    /*sql*/ `select students.*, houses.name as house 
                              from hogwarts_course.students
                              left join hogwarts_course.houses 
                              on students.fk_houses = houses.id
                              where hogwarts_course.students.id = $1;`,
    [id],
  );

  return result.rows[0];
}

export async function createStudent(student) {
  const result = await pool.query(
    /*sql*/
    `INSERT INTO hogwarts_course.students (name, school_year, fk_houses, birthday)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [student.name, student.school_year, student.fk_houses, student.birthday],
  );

  return result.rows[0];
}

export async function updateStudent(student) {
  const result = await pool.query(
    /*sql*/ ` UPDATE hogwarts_course.students
     SET name = $1, school_year = $2, fk_houses = $3, birthday = $4
     WHERE id = $5
     RETURNING id`,
    [
      student.name,
      student.school_year,
      student.fk_houses,
      student.birthday,
      student.id,
    ],
  );

  if (!result.rows[0]) return undefined;

  const updatedId = result.rows[0].id;
  return getStudentById(updatedId);
}

export async function deleteStudent(id) {
  const result = await pool.query(
    "DELETE FROM hogwarts_course.students WHERE id = $1",
    [id],
  );

  return result.rowCount;
}
