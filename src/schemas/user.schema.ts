import { z } from "zod";
import { studentSchema } from "./student.schema";
import { teacherSchema } from "./teacher.schema";

export const userSchema = z.object({
  id: z.cuid(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
  role: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userWithRelationsSchema = z.lazy(() =>
  userSchema.extend({
    student: studentSchema.nullable(),
    teacher: teacherSchema.nullable(),
  }),
);

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Invalid email format.").min(1, "Email is required."),
  avatar: z.string().optional(),
  role: z
    .enum(["TEACHER", "ADMIN", "STUDENT", "SUPER_ADMIN"])
    .refine(
      (val) => ["TEACHER", "ADMIN", "STUDENT", "SUPER_ADMIN"].includes(val),
      {
        message: "Role must be one of the predefined values.",
      },
    ),
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});
