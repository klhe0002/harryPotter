import express from "express";

import * as gradesController from "../controllers/grades.controller.js";

const gradesRouter = express.Router();

gradesRouter.get("/", gradesController.getAllGrades);

gradesRouter.get("/:letter", gradesController.getGradesByLetter);

export default gradesRouter;
