import { z } from "zod";
import { levelSchema } from "./qualification-level.schema";

export const qualificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  bannerUrl: z.url().optional(),
  workload: z.number().int().positive(),
  credits: z.number().int().positive(),
  knowledgeAreas: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const qualificationWithRelationsSchema = z.lazy(() =>
  qualificationSchema.extend({
    levels: z.array(levelSchema),
  })
);

export const createQualificationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  bannerUrl: z.url().optional(),
  workload: z.number().int().positive(),
  credits: z.number().int().positive(),
  knowledgeAreas: z.string().optional(),
});

export const updateQualificationSchema = createQualificationSchema.partial();
