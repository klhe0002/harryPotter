import express from "express";

import * as housesController from "../controllers/houses.controllers.js";

const houseRouter = express.Router();

/////// houses ///////
//get houses
app.get("/", housesControllers.getAllHouses);

//get single house
app.get("/:id", housesControllers.getHouseById);

//create house
app.post("/", housesControllers.createHouse);

//update house
app.put("/:id", housesControllers.updateHouse);

//delete house
app.delete("/:id", housesControllers.deleteHouse);
