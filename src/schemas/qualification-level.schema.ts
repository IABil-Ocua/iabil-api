import z from "zod";
import { qualificationSchema } from "./qualification.schema";
import { chapterSchema } from "./chapter.schema";

export const levelSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  noticeUrl: z.string(),
  qualificationId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const levelWithRelationsSchema = z.lazy(() =>
  levelSchema.extend({
    qualification: qualificationSchema,
    chapters: z.array(chapterSchema),
  })
);

export const createLevelSchema = z.object({
  title: z.string(),
  description: z.string(),
  noticeUrl: z.string(),
  qualificationId: z.string(),
});

export const updateLevelSchema = createLevelSchema.partial();
