import z from "zod";
import { quizzSchema } from "./quizz.schema";

export const quizzItemSchemaa = z.object({
  id: z.string(),
  question: z.string(),
  option1: z.string(),
  option2: z.string(),
  option3: z.string().nullable(),
  option4: z.string().nullable(),
  answer: z.string(),
  quizzId: z.string(),
  creaedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const quizzItemsWithRelationsSchema = z.lazy(() =>
  quizzItemSchemaa.extend({
    quizz: quizzSchema,
  })
);

export const createQuizzItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  option1: z.string().min(1, "Option 1 is required"),
  option2: z.string().min(1, "Option 1 is required"),
  option3: z.string().nullable(),
  option4: z.string().nullable(),
  answer: z.string().min(1, "Answer is required"),
  quizzId: z.string().min(1, "Quizz ID 1 is required"),
});

export const updateQuizzItemSchema = createQuizzItemSchema.partial();

export const checkQuizzAnswerSchema = z.object({
  quizzItemId: z.string().min(1, "Quizz item ID is required"),
  studentAnswer: z.string().min(1, "Student answer is required"),
});
