import * as studentsRepositories from "../repositories/students.repository.js";

// se alle students i databasen
export async function getAllStudents(req, res) {
  //vi awaiter repositoriet og sender allStudents som json
  // try {
  const allStudents = await studentsRepositories.getAllStudents();

  res.json(allStudents);

  // hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden
  // } catch (error) {
  //   res.status(500).json({ error: "Database error", code: error.code });
  // }
}

//se fx. student med id 1
export async function getStudentById(req, res) {
  // vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
  // try {
  const student = await studentsRepositories.getStudentById(req.params.id);
  //hvis der ikke er student så returner statuskode 404 og send json object  error: "Student not found" til clienten
  if (!student) return res.status(404).json({ error: "Student not found" });
  //ellers skriv statuskode 200 ok og skriv student som json
  res.status(200).json(student);
  // } catch (error) {
  //   //hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden
  //   res.status(500).json({ error: "Database error", code: error.code });
  // }
}

//opret en student
export async function createStudent(req, res) {
  // vi henter name, year og fk_houses fra request body
  // try {
  const { name, year, fk_houses } = req.body;
  //vi awaiter resultatet fra repo
  const student = await studentsRepositories.createStudent(
    name,
    year,
    fk_houses,
  );
  //send statuskoden 201 og send student som json
  res.status(201).json(student);

  //hvis repo kaster en fejl så send statuskode 500 med database error og fejlkoden
  // } catch (error) {
  //   res.status(500).json({ error: "Database error", code: error.code });
  // }
}

//updater en student
export async function updateStudent(req, res) {
  //vi henter name, year og fk_houses fra request body
  // try {
  const { name, year, fk_houses } = req.body;
  // vi sender id fra URL'en (req.params.id) samt name, year og fk_houses til repo, som opdaterer studenten
  const student = await studentsRepositories.updateStudent(
    req.params.id,
    name,
    year,
    fk_houses,
  );
  //hvis der ikke er student så send statuskoden 404 og send student not found
  if (!student) return res.status(404).json({ error: "Student not found" });
  //ellers send statuskode 200 og student som json
  res.status(200).json(student);
  // } catch (error) {
  //   // hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden
  //   res.status(500).json({ error: "Database error", code: error.code });
  // }
}

//slet/fjern en student
export async function deleteStudent(req, res) {
  //vi sender id fra url til repo, som sletter studenten
  // try {
  const deleted = await studentsRepositories.deleteStudent(req.params.id);
  // repo returnerer antal slettede rækker, hvis 0, fandtes studenten ikke
  if (deleted === 0)
    //så returner statuskode 404 og student not found
    return res.status(404).json({ error: "Student not found" });
  //ellers send statuskode 204
  res.sendStatus(204);
  // } catch (error) {
  //   //hvis repo kaster en fejl så send statuskode 500 og database error med fejlkoden
  //   res.status(500).json({ error: "Database error", code: error.code });
  // }
}
