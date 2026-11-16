import * as housesRepositories from "../repositories/houses.repository.js";

export async function getAllHouses(req, res) {
  const allHouses = await housesRepositories.getAllHouses();

  res.json(allHouses);
}

export async function getHouseById(req, res) {
  const house = await housesRepositories.getHouseById(req.params.id);
  if (!house)
    res.status(200).json(house);
}
