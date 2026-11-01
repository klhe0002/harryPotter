import express from "express";

import * as housesController from "../controllers/houses.controllers.js";

const houseRouter = express.Router();

/////// houses ///////
//get houses
houseRouter.get("/", housesController.getAllHouses);

//get single house
houseRouter.get("/:id", housesController.getHouseById);

export default houseRouter;
