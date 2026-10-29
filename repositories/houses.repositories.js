import { pool } from "../db.js";

export async function getAllHouses() {
    const result = await pool.query('SELECT * FROM "hogwartsCourse".houses');

    return result.rows;
}

export async function getHouseById(id) {
    const result = await pool.query(
        'SELECT * FROM "hogwartsCourse".houses WHERE id = $1',
        [id],
    );

    return result.rows[0];
}

export async function createHouse(id, name, colors, founder) {
    const result = await pool.query(
        `INSERT INTO "hogwartsCourse".houses (id, "Name", "Colors", "Founder")
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [id, name, colors, founder],
    );

    return result.rows[0];
}

export async function updateHouse(id, name, colors, founder) {
    const result = await pool.query(
        `UPDATE "hogwartsCourse".houses SET "Name" = $1, "Colors" = $2, "Founder" = $3
         WHERE id = $4
         RETURNING *`,
        [name, colors, founder, id],
    );

    return result.rows[0];
}

export async function deleteHouse(id) {
    const result = await pool.query(
        'DELETE FROM "hogwartsCourse".houses WHERE id = $1',
        [id],
    );

    return result.rowCount;
}
