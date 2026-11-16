import * as z from "zod";

export const CreateExamDto = z.object({
  fk_course: z.int(),
  fk_student: z.int(),
  fk_grade: z.enum(["O", "E", "A", "P", "D", "T"]),
});

export const UpdatedExamDto = CreateExamDto.extend({
  id: z.int(),
});
