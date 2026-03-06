import { z } from "zod";
import { levelSchema } from "./qualification-level.schema";

export const qualificationSchema = z.object({
  id: z.cuid(),
  name: z.string(),
  description: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  workload: z.number().int().positive().nullable(),
  credits: z.number().int().positive().nullable(),
  knowledgeAreas: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const qualificationWithRelationsSchema = z.lazy(() =>
  qualificationSchema.extend({
    levels: z.array(levelSchema).nullable(),
  }),
);

export const createQualificationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  bannerUrl: z.string().nullable().optional(),
  workload: z.number().int().positive(),
  credits: z.number().int().positive(),
  knowledgeAreas: z.string().optional(),
});

export const updateQualificationSchema = createQualificationSchema.partial();
