import * as z from "zod";

const courseFields = z.object({
  name: z.string(),
  fk_teachers: z.int().nullable(),
  type: z.enum(["core", "elective", "extra-curricular"]),
  level: z.enum(["OWL", "NEWT"]),
  school_year: z.int().min(1).max(7),
});

function levelMatchesYear(course) {
  if (course.level === "OWL") return course.school_year <= 5;
  if (course.level === "NEWT") return course.school_year >= 6;
  return true;
}

const levelError = {
  message: "OWL er kun på år 1-5, og NEWT er kun på år 6-7",
  path: ["level"],
};

export const CreateCourseDto = courseFields.refine(levelMatchesYear, levelError);

export const UpdatedCourseDto = courseFields
  .extend({ id: z.int() })
  .refine(levelMatchesYear, levelError);
