import express from "express";
import houseRouter from "./router/houses.router.js";

app.use("/houses/", houseRouter);
