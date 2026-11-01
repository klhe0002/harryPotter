import { pool } from "../db.js";

// se alle houses i databasen
export async function getAllHouses() {
  //vi awaiter en query der henter alle rækker fra houses tabellen
  const result = await pool.query("SELECT * FROM hogwarts_course.houses");

  //returner alle rækkerne til controlleren
  return result.rows;
}

//se fx. house med id 1
export async function getHouseById(id) {
  //vi awaiter en query der henter housen med det id der bliver sendt med fra controlleren ($1 = id)
  const result = await pool.query(
    "SELECT * FROM hogwarts_course.houses WHERE id = $1",
    [id],
  );

  //returner den første række, hvis der ikke er nogen bliver det undefined og controlleren sender 404
  return result.rows[0];
}
