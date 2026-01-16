import z from "zod";
import { quizzSchema } from "./quizz.schema";
import { levelSchema } from "./qualification-level.schema";

export const chapterSchema = z.object({
  id: z.string(),
  content: z.string(),
  supplementaryMaterialUrl1: z.string().nullable(),
  supplementaryMaterialUrl2: z.string().nullable(),
  levelId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const chapterWithRelationsSchema = z.lazy(() =>
  chapterSchema.extend({
    level: levelSchema,
    quizzes: z.array(quizzSchema),
  })
);

export const createChapterSchema = z.object({
  content: z.string().min(1, "Content is required"),
  supplementaryMaterialUrl1: z.string().optional(),
  supplementaryMaterialUrl2: z.string().optional(),
  levelId: z.string().min(1, "Lavel ID is required"),
});

export const updateChapterSchema = createChapterSchema.partial();
