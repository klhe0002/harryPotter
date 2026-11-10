import express from "express";

import * as housesController from "../controllers/houses.controller.js";

const houseRouter = express.Router();

/////// houses ///////
//get houses
houseRouter.get("/", housesController.getAllHouses);

//get single house
houseRouter.get("/:id", housesController.getHouseById);

export default houseRouter;
