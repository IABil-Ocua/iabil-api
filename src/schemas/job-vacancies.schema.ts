import z from "zod";

export const jobVacancySchema = z.object({
  id: z.cuid(),
  title: z.string(),
  companyName: z.string(),
  url: z.string(),
  location: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createJobVacancySchema = z.object({
  title: z.string().min(3, "Title is required"),
  companyName: z.string().min(2, "Company name is required"),
  url: z.string(),
  location: z.string().min(5, "Location is required"),
});

export const updateJobVacancySchema = createJobVacancySchema.partial();
