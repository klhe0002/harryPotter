import * as z from "zod";

export const UpdatedStudentDto = z.object({
  id: z.int(),
  name: z.string(),
  fk_houses: z.int(),
  school_year: z.int().min(1).max(7),
  birthday: z.iso.date(),
});

export const CreateStudentDto = z.object({
  name: z.string(),
  fk_houses: z.int(),
  school_year: z.int().min(1).max(7),
  birthday: z.iso.date(),
});
