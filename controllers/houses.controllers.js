import * as housesRepositories from "../repositories/houses.repositories.js";

export async function getAllHouses(req, res) {
  try {
    // const result = await pool.query("SELECT * FROM houses");
    const allHouses = await housesRepositories.getAllHouses();

    console.log(allHouses);
    // res.json(result.rows);
    res.json(allHouses);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

export async function getHouseById(req, res) {
  try {
    const house = await housesRepositories.getHouseById(req.params.id);

    if (!house) return res.status(404).json({ error: "House not found" });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

export async function createHouse(req, res) {
  try {
    const { id, name, colors, founder } = req.body;
    const house = await housesRepositories.createHouse(id, name, colors, founder);

    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

export async function updateHouse(req, res) {
  try {
    const { name, colors, founder } = req.body;
    const house = await housesRepositories.updateHouse(req.params.id, name, colors, founder);

    if (!house) return res.status(404).json({ error: "House not found" });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

export async function deleteHouse(req, res) {
  try {
    const deleted = await housesRepositories.deleteHouse(req.params.id);

    if (deleted === 0) return res.status(404).json({ error: "House not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
