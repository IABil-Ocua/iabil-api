import z from "zod";
import { quizzSchema } from "./quizz.schema";
import { moduleSchema } from "./module.schema";

export const chapterSchema = z.object({
  id: z.cuid(),
  title: z.string(),
  content: z.string(),
  supplementaryMaterialUrl1: z.string().nullable(),
  supplementaryMaterialUrl2: z.string().nullable(),
  moduleId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const chapterWithRelationsSchema = z.lazy(() =>
  chapterSchema.extend({
    module: moduleSchema,
    quizzes: z.array(quizzSchema),
  }),
);

export const createChapterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  supplementaryMaterialUrl1: z.string().optional(),
  supplementaryMaterialUrl2: z.string().optional(),
  moduleId: z.string().min(1, "Module ID is required"),
});

export const updateChapterSchema = createChapterSchema.partial();
