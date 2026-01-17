import z from "zod";
import { chapterSchema } from "./chapter.schema";
import { quizzItemSchemaa } from "./quizz-items.schema";

export const quizzSchema = z.object({
  id: z.string(),
  name: z.string(),
  chapterId: z.string(),
  creaedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const quizzWithRealatiosSchema = z.lazy(() =>
  quizzSchema.extend({
    chapter: chapterSchema,
    quizzItems: z.array(quizzItemSchemaa),
  })
);

export const createQuizzSchema = z.object({
  name: z.string().min(1, "Quizz name is required"),
  chapterId: z.string().min(1, "Chapter ID is required"),
});

export const updateQuizzSchema = createQuizzSchema.partial();
