import express from "express";

import * as examsController from "../controllers/exams.controller.js";

const examsRouter = express.Router();

examsRouter.get("/", examsController.getAllExams);

examsRouter.get("/:id", examsController.getExamById);

examsRouter.post("/", examsController.createExam);

examsRouter.put("/:id", examsController.updateExam);

examsRouter.delete("/:id", examsController.deleteExam);

export default examsRouter;
