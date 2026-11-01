# Pseudokode

## houses

GET /houses
- se alle houses i databasen
- vi awaiter repositoriet og sender allHouses som json
- hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden

GET /houses/:id
- se fx. house med id 1
- vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
- hvis der ikke er house så returner statuskode 404 og send json object error: "House not found" til clienten
- ellers skriv statuskode 200 ok og skriv house som json
- hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden

## teachers

GET /teachers
- se alle teachers i databasen
- vi awaiter repositoriet og sender allTeachers som json
- hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden

GET /teachers/:id
- se fx. teacher med id 1
- vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
- hvis der ikke er teacher så returner statuskode 404 og send json object error: "Teacher not found" til clienten
- ellers skriv statuskode 200 ok og skriv teacher som json
- hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden

POST /teachers
- opret en teacher
- vi henter name og fk_houses fra request body
- vi awaiter resultatet fra repo
- send statuskoden 201 og send teacher som json
- hvis repo kaster en fejl så send statuskode 500 med database error og statuskoden

PUT /teachers/:id
- updater en teacher
- vi henter name og fk_houses fra request body
- vi sender id fra URL'en (req.params.id) samt name og fk_houses til repo, som opdaterer teacheren
- hvis der ikke er teacher så send statuskoden 404 og send teacher not found
- ellers send statuskode 200 og teacher som json
- hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden

DELETE /teachers/:id
- slet/fjern en teacher
- vi sender id fra url til repo, som sletter teacheren
- repo returnerer antal slettede rækker, hvis 0, fandtes teacheren ikke
- så returner statuskode 404 og teachr not found
- ellers send statuskode 204
- hvis repo kaster en fejl så send statuskode 500 og statabse error med fejlkoden

## students

GET /students
- se alle students i databasen
- vi awaiter repositoriet og sender allStudents som json
- hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden

GET /students/:id
- se fx. student med id 1
- vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
- hvis der ikke er student så returner statuskode 404 og send json object error: "Student not found" til clienten
- ellers skriv statuskode 200 ok og skriv student som json
- hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden

POST /students
- opret en student
- vi henter name, year og fk_houses fra request body
- vi awaiter resultatet fra repo
- send statuskoden 201 og send student som json
- hvis repo kaster en fejl så send statuskode 500 med database error og fejlkoden

PUT /students/:id
- updater en student
- vi henter name, year og fk_houses fra request body
- vi sender id fra URL'en (req.params.id) samt name, year og fk_houses til repo, som opdaterer studenten
- hvis der ikke er student så send statuskoden 404 og send student not found
- ellers send statuskode 200 og student som json
- hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden

DELETE /students/:id
- slet/fjern en student
- vi sender id fra url til repo, som sletter studenten
- repo returnerer antal slettede rækker, hvis 0, fandtes studenten ikke
- så returner statuskode 404 og student not found
- ellers send statuskode 204
- hvis repo kaster en fejl så send statuskode 500 og database error med fejlkoden

## courses

GET /courses
- se alle courses i databasen
- vi awaiter repositoriet og sender allCourses som json
- hvis repositoriet kaster en fejl (fx databasefejl), send status 500 med "Database error" og fejlkoden

GET /courses/:id
- se fx. course med id 1
- vi awaiter repositoriet og sender id'et fra URL'en (req.params.id) med
- hvis der ikke er course så returner statuskode 404 og send json object error: "Course not found" til clienten
- ellers skriv statuskode 200 ok og skriv course som json
- hvis repo kaster fejl så send statuskode 500 med database error og fejlkoden

POST /courses
- opret en course
- vi henter name og fk_teachers fra request body
- vi awaiter resultatet fra repo
- send statuskoden 201 og send course som json
- hvis repo kaster en fejl så send statuskode 500 med database error og fejlkoden

PUT /courses/:id
- updater navnet på en course
- vi henter name fra request body
- vi sender id fra URL'en (req.params.id) samt name til repo, som opdaterer coursens navn
- hvis der ikke er course så send statuskoden 404 og send course not found
- ellers send statuskode 200 og course som json
- hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden

DELETE /courses/:id
- slet/fjern en course
- vi sender id fra url til repo, som sletter coursen
- repo returnerer antal slettede rækker, hvis 0, fandtes coursen ikke
- så returner statuskode 404 og course not found
- ellers send statuskode 204
- hvis repo kaster en fejl så send statuskode 500 og database error med fejlkoden

PUT /courses/:id/teacher
- updater teacheren på en course
- vi henter fk_teachers fra request body
- vi sender id fra URL'en (req.params.id) samt fk_teachers til repo, som opdaterer coursens teacher
- hvis der ikke er course så send statuskoden 404 og send course not found
- ellers send statuskode 200 og course som json
- hvis repo kaster en fejl så send statuskoden 500 med database error og fejlkoden

POST /courses/:id/students
- tilføj en student til en course
- vi henter fk_student fra request body
- vi sender id fra URL'en (req.params.id) samt fk_student til repo, som tilføjer studenten til coursen
- send statuskoden 201 og send enrollment som json
- hvis repo kaster en fejl så send statuskode 500 med database error og fejlkoden

DELETE /courses/:id/students/:studentId
- fjern en student fra en course
- vi sender course id og student id fra url til repo, som fjerner studenten fra coursen
- repo returnerer antal slettede rækker, hvis 0, var studenten ikke på coursen
- så returner statuskode 404 og student not on course
- ellers send statuskode 204
- hvis repo kaster en fejl så send statuskode 500 og database error med fejlkoden
