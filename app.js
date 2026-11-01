import express from "express";
import houseRouter from "./router/houses.router.js";
import teacherRouter from "./router/teachers.router.js";
import studentRouter from "./router/students.router.js";
import courseRouter from "./router/courses.router.js";

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
