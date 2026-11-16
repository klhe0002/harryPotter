import * as studentsRepositories from "../repositories/students.repository.js";

export async function getAllStudents(req, res) {
  const allStudents = await studentsRepositories.getAllStudents();

  res.json(allStudents);
}

export async function getStudentById(req, res) {
  const student = await studentsRepositories.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.status(200).json(student);
}

export async function createStudent(req, res) {
  const { name, year, fk_houses } = req.body;
  const student = await studentsRepositories.createStudent(
    name,
    year,
    fk_houses,
  );
  res.status(201).json(student);
}

export async function updateStudent(req, res) {
  const { name, year, fk_houses } = req.body;
  const student = await studentsRepositories.updateStudent(
    req.params.id,
    name,
    year,
    fk_houses,
  );
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.status(200).json(student);
}

export async function deleteStudent(req, res) {
  const deleted = await studentsRepositories.deleteStudent(req.params.id);
  if (deleted === 0)
    return res.status(404).json({ error: "Student not found" });
  res.sendStatus(204);
}
