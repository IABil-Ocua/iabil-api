import { z } from "zod";
import { userSchema } from "./user.schema";

export const ArticleStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const ArticleCategoryEnum = z.enum(["INNOVATION", "PUBLICATION"]);

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  imageUrl: z.string().nullable(),
  category: ArticleCategoryEnum,
  tags: z.string().nullable(),
  status: ArticleStatusEnum.default("DRAFT"),
  isFeatured: z.boolean().default(false),
  authorId: z.string(),
  publishedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const articleWithRelationsSchema = z.lazy(() =>
  articleSchema.extend({
    author: userSchema,
  })
);

export const createArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().min(3, "Invalid slug."),
  content: z.string().min(10, "Content is required."),
  imageUrl: z.string().url().optional().nullable(),
  category: ArticleCategoryEnum,
  tags: z.string().optional().nullable(),
  status: ArticleStatusEnum.default("DRAFT"),
  isFeatured: z.boolean().default(false),
  authorId: z.string(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export const updateArticleSchema = createArticleSchema.partial();
