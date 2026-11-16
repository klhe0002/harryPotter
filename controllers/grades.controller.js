import * as gradesRepositories from "../repositories/grades.repository.js";
import HTTPError from "../errorhandling/HTTPerror.js";

export async function getAllGrades(req, res) {
  const allGrades = await gradesRepositories.getAllGrades();

  res.json(allGrades);
}

export async function getGradesByLetter(req, res) {
  const grade = await gradesRepositories.getGradesByLetter(
    req.params.letter.toUpperCase(),
  );
  if (grade) {
    return res.status(200).json(grade);
  }
  throw new HTTPError(404, "Grade not found");
}
