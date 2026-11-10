import express from "express";
import houseRouter from "./routers/houses.router.js";
import teacherRouter from "./routers/teachers.router.js";
import studentRouter from "./routers/students.router.js";
import courseRouter from "./routers/courses.router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/houses", houseRouter);

app.use("/teachers", teacherRouter);

app.use("/students", studentRouter);

app.use("/courses", courseRouter);

app.listen(port, () => {
  console.log(`Server kører på http://localhost:${port}`);
});
