import * as z from "zod";

export const UpdatedTeacherDto = z.object({
  id: z.int(),
  name: z.string(),
  fk_houses: z.int(),
  employment_start: z.iso.date(),
  currently_active: z.boolean(),
  deceased: z.boolean(),
});

export const CreateTeacherDto = z.object({
  name: z.string(),
  fk_houses: z.int(),
  employment_start: z.iso.date(),
  currently_active: z.boolean(),
  deceased: z.boolean(),
});
