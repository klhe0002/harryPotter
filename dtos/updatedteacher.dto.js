import * as z from "zod";

export const UpdatedTeacherDto = z.object({
  id: z.int(),
  name: z.string(),
  fk_houses: z.int(),
});
