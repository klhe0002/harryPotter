import * as teachersRepositories from "../repositories/teachers.repositories.js";

// se alle teachers i databasen
export async function getAllTeachers(req, res) {
  //vi awaiter repositoriet og sender allTeachers som json
  try {
    const allTeachers = await teachersRepositories.getAllTeachers();

    res.json(allTeachers);

    // hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//se fx. teacher med id 1
export async function getTeacherById(req, res) {
  //vi awaiter repositoriet og requester med et id
  // vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
  try {
    const teacher = await teachersRepositories.getTeacherById(req.params.id);
    //hvis der ikke er teacher så returner statuskode 404 og send json object  error: "Teacher not found" til clienten
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    //ellers skriv statuskode 200 ok og skriv teacher som json
    res.status(200).json(teacher);
  } catch (error) {
    //hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//opret en teacher
export async function createTeacher(req, res) {
  // vi henter name og fk_houses fra request body
  try {
    const { name, fk_houses } = req.body;
    //vi awaiter resultatet fra repo
    const teacher = await teachersRepositories.createTeacher(name, fk_houses);
    //send statuskoden 201 og send teacher som json
    res.status(201).json(teacher);

    //hvis repo kaster en fejl så send statuskode 500 med database error og statuskoden
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//updater en teacher
export async function updateTeacher(req, res) {
  //vi henter name og fk_houses fra request body
  try {
    const { name, fk_houses } = req.body;
    // vi sender id fra URL'en (req.params.id) samt name og fk_houses til repo, som opdaterer teacheren
    const teacher = await teachersRepositories.updateTeacher(
      req.params.id,
      name,
      fk_houses,
    );
    //hvis der ikke er teacher så send statuskoden 404 og send teacher not found
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    //ellers send statuskode 200 og teacher som json
    res.status(200).json(teacher);
  } catch (error) {
    // hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//slet/fjern en teacher
export async function deleteTeacher(req, res) {
  //vi sender id fra url til repo, som sletter teacheren
  try {
    const deleted = await teachersRepositories.deleteTeacher(req.params.id);
    // repo returnerer antal slettede rækker, hvis 0, fandtes teacheren ikke
    if (deleted === 0)
      //så returner statuskode 404 og teachr not found
      return res.status(404).json({ error: "Teacher not found" });
    //ellers send statuskode 204
    res.sendStatus(204);
  } catch (error) {
    //hvis repo kaster en fejl så send statuskode 500 og statabse error med fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
