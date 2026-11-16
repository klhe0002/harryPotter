import { pool } from "../db.js";

export async function getAllTeachers() {
  const result =
    await pool.query(/*sql*/ `select teachers.id, teachers.name, houses.name as house 
                              from hogwarts_course.teachers
                              left join hogwarts_course.houses 
                              on teachers.fk_houses = houses.id`);

  return result.rows;
}

export async function getTeacherById(id) {
  const result = await pool.query(
    /*sql*/ `select teachers.*, houses.name as house 
                              from hogwarts_course.teachers
                              left join hogwarts_course.houses 
                              on teachers.fk_houses = houses.id
                              where hogwarts_course.teachers.id = $1;`,
    [id],
  );

  return result.rows[0];
}

export async function createTeacher(teacher) {
  const result = await pool.query(
    `INSERT INTO hogwarts_course.teachers (name, fk_houses)
     VALUES ($1, $2)
     RETURNING *`,
    [teacher.name, teacher.fk_houses],
  );

  return result.rows[0];
}

export async function updateTeacher(teacher) {
  const result = await pool.query(
    /*sql*/ ` UPDATE hogwarts_course.teachers SET name = $1, fk_houses = $2
     WHERE id = $3
     RETURNING id`,
    [teacher.name, teacher.fk_houses, teacher.id],
  );

  if (!result.rows[0]) return undefined;

  const updatedId = result.rows[0].id;
  return getTeacherById(updatedId);
}

export async function deleteTeacher(id) {
  const result = await pool.query(
    "DELETE FROM hogwarts_course.teachers WHERE id = $1",
    [id],
  );

  return result.rowCount;
}
