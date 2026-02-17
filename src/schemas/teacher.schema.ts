import * as z from "zod";

export const teacherSchema = z.object({
  id: z.cuid(),
  name: z.string().min(3).optional(),
  email: z.email(),
  phoneNumber: z.string().optional().nullable(),
  academicTitle: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createTeacherSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email"),
  phoneNumber: z.string().optional().nullable(),
  academicTitle: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
});

export const updateTeacherSchema = createTeacherSchema.partial();

export const teacherIdParamsSchema = z.object({
  id: z.string().min(1, "ID obrigatório"),
});
