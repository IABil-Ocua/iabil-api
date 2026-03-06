import z from "zod";
import { chapterSchema } from "./chapter.schema";
import { quizzItemSchema } from "./quizz-items.schema";

export const quizzSchema = z.object({
  id: z.cuid(),
  name: z.string(),
  chapterId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const quizzWithRelationsSchema = z.lazy(() =>
  quizzSchema.extend({
    chapter: chapterSchema,
    quizzItems: z.array(quizzItemSchema),
  }),
);

export const createQuizzSchema = z.object({
  name: z.string().min(1, "Quizz name is required"),
  chapterId: z.string().min(1, "Chapter ID is required"),
});

export const updateQuizzSchema = createQuizzSchema.partial();
