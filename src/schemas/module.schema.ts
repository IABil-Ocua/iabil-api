import z from "zod";
import { levelSchema } from "./qualification-level.schema";
import { chapterSchema } from "./chapter.schema";

export const moduleSchema = z.object({
  id: z.cuid(),
  title: z.string(),
  description: z.string().nullable(),
  workload: z.number().int().positive(),
  levelId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const moduleWithRelationsSchema = z.lazy(() =>
  moduleSchema.extend({
    level: levelSchema,
    chapters: z.array(chapterSchema),
  }),
);

export const createModuleSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  workload: z.number().int().positive(),
  levelId: z.string(),
});

export const updateModuleSchema = createModuleSchema.partial();
