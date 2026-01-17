import { url } from "node:inspector";
import z from "zod";

export const jobVacancySchema = z.object({
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  url: z.string(),
  location: z.string(),
  creaedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createJobVacancySchema = z.object({
  title: z.string().min(3, "O título é obrigatório"),
  companyName: z.string().min(2, "O nome da empresa é obrigatória"),
  url: z.string(),
  location: z.string().min(5, "O local é obrigatório"),
});

export const updateJobVacancySchema = createJobVacancySchema.partial();
