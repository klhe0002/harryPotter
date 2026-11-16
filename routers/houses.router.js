import express from "express";

import * as housesController from "../controllers/houses.controller.js";

const houseRouter = express.Router();

houseRouter.get("/", housesController.getAllHouses);

houseRouter.get("/:id", housesController.getHouseById);

export default houseRouter;
