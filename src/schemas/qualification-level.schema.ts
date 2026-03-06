import z from "zod";
import { qualificationSchema } from "./qualification.schema";
import { moduleSchema } from "./module.schema";

export const levelSchema = z.object({
  id: z.cuid(),
  title: z.string(),
  description: z.string().nullable(),
  noticeUrl: z.string().nullable(),
  qualificationId: z.string(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const levelWithRelationsSchema = z.lazy(() =>
  levelSchema.extend({
    qualification: qualificationSchema,
    modules: z.array(moduleSchema),
  }),
);

export const createLevelSchema = z.object({
  title: z.string(),
  description: z.string(),
  noticeUrl: z.string(),
  qualificationId: z.string(),
});

export const updateLevelSchema = createLevelSchema.partial();
