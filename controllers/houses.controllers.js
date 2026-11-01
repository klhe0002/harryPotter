import * as housesRepositories from "../repositories/houses.repositories.js";

// se alle houses i databasen
export async function getAllHouses(req, res) {
  //vi awaiter repositoriet og sender allHouses som json
  try {
    const allHouses = await housesRepositories.getAllHouses();

    res.json(allHouses);

    // hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//se fx. house med id 1
export async function getHouseById(req, res) {
  // vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
  try {
    const house = await housesRepositories.getHouseById(req.params.id);
    //hvis der ikke er house så returner statuskode 404 og send json object  error: "House not found" til clienten
    if (!house) return res.status(404).json({ error: "House not found" });
    //ellers skriv statuskode 200 ok og skriv house som json
    res.status(200).json(house);
  } catch (error) {
    //hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
