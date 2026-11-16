import * as z from "zod";

const teacherFields = z.object({
  name: z.string(),
  fk_houses: z.int(),
  employment_start: z.iso.date(),
  currently_active: z.boolean(),
  deceased: z.boolean(),
});

function hasStartedIfActive(teacher) {
  if (!teacher.currently_active) return true;
  const today = new Date().toISOString().slice(0, 10);
  return teacher.employment_start <= today;
}

const activeError = {
  message: "En teacher kan ikke være active før employment_start",
  path: ["currently_active"],
};

export const CreateTeacherDto = teacherFields.refine(
  hasStartedIfActive,
  activeError,
);

export const UpdatedTeacherDto = teacherFields
  .extend({ id: z.int() })
  .refine(hasStartedIfActive, activeError);
