import * as teachersRepositories from "../repositories/teachers.repository.js";
import HTTPError from "../errorhandling/HTTPerror.js";
// se alle teachers i databasen
export async function getAllTeachers(req, res) {
  const allTeachers = await teachersRepositories.getAllTeachers();

  res.json(allTeachers);
}

//se fx. teacher med id 1
//med correct fejlhåndtering
export async function getTeacherById(req, res) {
  const teacher = await teachersRepositories.getTeacherById(req.params.id);
  if (teacher) {
    return res.status(200).json(teacher);
  }
  throw new HTTPError(404, "Teacher not found");
}

//opret en teacher
export async function createTeacher(req, res) {
  const { name, fk_houses } = req.body;

  const teacher = await teachersRepositories.createTeacher(name, fk_houses);

  res.status(201).json(teacher);
}

//updater en teacher
export async function updateTeacher(req, res) {
  const { name, fk_houses } = req.body;
  const teacher = await teachersRepositories.updateTeacher(
    req.params.id,
    name,
    fk_houses,
  );
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });
  res.status(200).json(teacher);
}

//slet/fjern en teacher
export async function deleteTeacher(req, res) {
  const deleted = await teachersRepositories.deleteTeacher(req.params.id);
  if (deleted === 0) 
    throw new HTTPError(404, "Teacher not found");

  res.sendStatus(204);
}
