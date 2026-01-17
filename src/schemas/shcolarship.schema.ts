import { z } from "zod";

export const scholarshipSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  sponsor: z.string().nullable(),
  amount: z.number().nullable(),
  type: z.string(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "CLOSED"]),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const createScholarshipSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  sponsor: z.string().optional(),
  amount: z.number().optional(),
  type: z.string().min(1, "Scholarship type is required"),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "CLOSED"]),
});

export const updateScholarshipSchema = createScholarshipSchema.partial();
