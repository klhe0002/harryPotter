import * as teachersRepositories from "../repositories/teachers.repository.js";
import HTTPError from "../errorhandling/HTTPerror.js";
import { UpdatedTeacherDto, CreateTeacherDto } from "../dtos/teacher.dto.js";

export async function getAllTeachers(req, res) {
  const allTeachers = await teachersRepositories.getAllTeachers();

  res.json(allTeachers);
}

export async function getTeacherById(req, res) {
  const teacher = await teachersRepositories.getTeacherById(req.params.id);
  if (teacher) {
    return res.status(200).json(teacher);
  }
  throw new HTTPError(404, "Teacher not found");
}

export async function createTeacher(req, res) {
  const newTeacher = CreateTeacherDto.parse(req.body);

  const teacher = await teachersRepositories.createTeacher(newTeacher);

  res.status(201).json(teacher);
}

export async function updateTeacher(req, res) {
  const input = { ...req.body, id: Number(req.params.id) };
  const newTeacher = UpdatedTeacherDto.parse(input);

  const teacher = await teachersRepositories.updateTeacher(newTeacher);
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });
  res.status(200).json(teacher);
}

export async function deleteTeacher(req, res) {
  const deleted = await teachersRepositories.deleteTeacher(req.params.id);
  if (deleted === 0) throw new HTTPError(404, "Teacher not found");

  res.sendStatus(204);
}
