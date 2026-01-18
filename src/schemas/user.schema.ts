import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().nullable().optional(),
  cover: z.string().nullable().optional(),
  birthDate: z.coerce.date().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  role: z
    .enum(["TEACHER", "ADMIN", "STUDENT", "GRADUETE"])
    .refine(
      (val) => ["TEACHER", "ADMIN", "STUDENT", "GRADUETE"].includes(val),
      {
        message: "Role must be one of the predefined values.",
      }
    ),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}).passthrough();


export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  avatar: z.string().optional(),
  cover: z.string().optional(),
  birthDate: z.coerce.date().nullable().optional(),
  avatarUrl: z.url("Invalid URL format").optional(),
  role: z
    .enum(["TEACHER", "ADMIN", "STUDENT", "GRADUETE"])
    .refine(
      (val) => ["TEACHER", "ADMIN", "STUDENT", "GRADUETE"].includes(val),
      {
        message: "Role must be one of the predefined values.",
      }
    ),
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email format"),
  password: z.string().min(1, "Password is required."),
});
