import * as examsRepositories from "../repositories/exams.repository.js";
import HTTPError from "../errorhandling/HTTPerror.js";
import { CreateExamDto, UpdatedExamDto } from "../dtos/exams.dto.js";

export async function getAllExams(req, res) {
  const allExams = await examsRepositories.getAllExams();
  res.json(allExams);
}

export async function getExamById(req, res) {
  const exam = await examsRepositories.getExamById(req.params.id);
  if (!exam) throw new HTTPError(404, "Exam not found");
  res.status(200).json(exam);
}

export async function createExam(req, res) {
  const newExam = CreateExamDto.parse(req.body);

  const exam = await examsRepositories.createExam(newExam);

  res.status(201).json(exam);
}

export async function updateExam(req, res) {
  const input = { ...req.body, id: Number(req.params.id) };
  const updatedExam = UpdatedExamDto.parse(input);

  const exam = await examsRepositories.updateExam(updatedExam);
  if (!exam) throw new HTTPError(404, "Exam not found");
  res.status(200).json(exam);
}

export async function deleteExam(req, res) {
  const deleted = await examsRepositories.deleteExam(req.params.id);
  if (deleted === 0) throw new HTTPError(404, "Exam not found");
  res.sendStatus(204);
}
