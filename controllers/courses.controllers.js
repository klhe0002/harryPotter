import * as coursesRepositories from "../repositories/courses.repositories.js";

// se alle courses i databasen
export async function getAllCourses(req, res) {
  //vi awaiter repositoriet og sender allCourses som json
  try {
    const allCourses = await coursesRepositories.getAllCourses();

    res.json(allCourses);

    // hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//se fx. course med id 1
export async function getCourseById(req, res) {
  // vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
  try {
    const course = await coursesRepositories.getCourseById(req.params.id);
    //hvis der ikke er course så returner statuskode 404 og send json object  error: "Course not found" til clienten
    if (!course) return res.status(404).json({ error: "Course not found" });
    //ellers skriv statuskode 200 ok og skriv course som json
    res.status(200).json(course);
  } catch (error) {
    //hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//opret en course
export async function createCourse(req, res) {
  // vi henter name og fk_teachers fra request body
  try {
    const { name, fk_teachers } = req.body;
    //vi awaiter resultatet fra repo
    const course = await coursesRepositories.createCourse(name, fk_teachers);
    //send statuskoden 201 og send course som json
    res.status(201).json(course);

    //hvis repo kaster en fejl så send statuskode 500 med database error og fejlkoden
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//updater navnet på en course
export async function updateCourseName(req, res) {
  //vi henter name fra request body
  try {
    const { name } = req.body;
    // vi sender id fra URL'en (req.params.id) samt name til repo, som opdaterer coursens navn
    const course = await coursesRepositories.updateCourseName(
      req.params.id,
      name,
    );
    //hvis der ikke er course så send statuskoden 404 og send course not found
    if (!course) return res.status(404).json({ error: "Course not found" });
    //ellers send statuskode 200 og course som json
    res.status(200).json(course);
  } catch (error) {
    // hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//slet/fjern en course
export async function deleteCourse(req, res) {
  //vi sender id fra url til repo, som sletter coursen
  try {
    const deleted = await coursesRepositories.deleteCourse(req.params.id);
    // repo returnerer antal slettede rækker, hvis 0, fandtes coursen ikke
    if (deleted === 0)
      //så returner statuskode 404 og course not found
      return res.status(404).json({ error: "Course not found" });
    //ellers send statuskode 204
    res.sendStatus(204);
  } catch (error) {
    //hvis repo kaster en fejl så send statuskode 500 og database error med fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//updater teacheren på en course
export async function updateCourseTeacher(req, res) {
  //vi henter fk_teachers fra request body
  try {
    const { fk_teachers } = req.body;
    // vi sender id fra URL'en (req.params.id) samt fk_teachers til repo, som opdaterer coursens teacher
    const course = await coursesRepositories.updateCourseTeacher(
      req.params.id,
      fk_teachers,
    );
    //hvis der ikke er course så send statuskoden 404 og send course not found
    if (!course) return res.status(404).json({ error: "Course not found" });
    //ellers send statuskode 200 og course som json
    res.status(200).json(course);
  } catch (error) {
    // hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//tilføj en student til en course
export async function addStudentToCourse(req, res) {
  // vi henter fk_student fra request body
  try {
    const { fk_student } = req.body;
    // vi sender id fra URL'en (req.params.id) samt fk_student til repo, som tilføjer studenten til coursen
    const enrollment = await coursesRepositories.addStudentToCourse(
      req.params.id,
      fk_student,
    );
    //send statuskoden 201 og send enrollment som json
    res.status(201).json(enrollment);

    //hvis repo kaster en fejl så send statuskode 500 med database error og fejlkoden
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
}

//fjern en student fra en course
export async function removeStudentFromCourse(req, res) {
  //vi sender course id og student id fra url til repo, som fjerner studenten fra coursen
  try {
    const removed = await coursesRepositories.removeStudentFromCourse(
      req.params.id,
      req.params.studentId,
    );
    // repo returnerer antal slettede rækker, hvis 0, var studenten ikke på coursen
    if (removed === 0)
      //så returner statuskode 404 og student not on course
      return res.status(404).json({ error: "Student not on course" });
    //ellers send statuskode 204
    res.sendStatus(204);
  } catch (error) {
    //hvis repo kaster en fejl så send statuskode 500 og database error med fejlkoden
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
