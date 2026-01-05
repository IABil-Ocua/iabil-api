import {
  createArticleHandler,
  getArticlesHandler,
  getArticleByIdHandler,
  getRecentArticlesHandler,
  updateArticleHandler,
  deleteArticleHandler,
} from "../controllers/article.controller";
import { FastifyTypedInstance } from "../types/zod";
import { createArticleSchema, ArticleStatusEnum } from "../schemas/article.schema";
import z from "zod";

export async function articleRoutes(app: FastifyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["articles"],
        description: "Create new article",
        body: z.object({
          title: z.string().min(3, "Title must be at least 3 characters"),
          slug: z.string().min(3, "Slug is required"),
          content: z.string().min(10, "Content is required"),
          imageUrl: z.string().url().optional(),
          category: z.string().optional(),
          tags: z.string().optional(),
          status: ArticleStatusEnum.default("DRAFT"),
          isFeatured: z.boolean().default(false),
          authorId: z.string().uuid(),
          publishedAt: z.string().datetime().optional(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
              article: z.object({
                id: z.string().uuid(),
                title: z.string(),
                slug: z.string(),
                content: z.string(),
                excerpt: z.string().optional(),
                imageUrl: z.string().url().optional(),
                category: z.string().optional(),
                tags: z.string().optional(),
                status: ArticleStatusEnum,
                isFeatured: z.boolean(),
                authorId: z.string().uuid(),
                author: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string().email(),
                }),
                publishedAt: z.string().datetime().optional(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Article created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    createArticleHandler
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["articles"],
        description: "List all articles",
        response: {
          200: z
            .object({
              message: z.string(),
              articles: z.array(
                z.object({
                  id: z.string().uuid(),
                  title: z.string(),
                  slug: z.string(),
                  excerpt: z.string().optional(),
                  content: z.string(),
                  category: z.string(),
                  tags: z.string().optional(),
                  isFeatured: z.boolean(),
                  status: ArticleStatusEnum,
                  author: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    email: z.string().email(),
                  }),
                  publishedAt: z.string().datetime().optional(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            })
            .describe("Articles fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    getArticlesHandler
  );

  app.get(
    "/recent",
    {
      schema: {
        tags: ["articles"],
        description: "Get recent published articles",
        response: {
          200: z
            .object({
              message: z.string(),
              articles: z.array(
                z.object({
                  id: z.string().uuid(),
                  title: z.string(),
                  excerpt: z.string().optional(),
                  content: z.string(),
                  category: z.string(),
                  tags: z.string().optional(),
                  isFeatured: z.boolean(),
                  status: ArticleStatusEnum,
                  author: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    email: z.string().email(),
                  }),
                  publishedAt: z.string().datetime().optional(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            })
            .describe("Recent articles fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    getRecentArticlesHandler
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["articles"],
        description: "Get article information by ID",
        params: z.object({
          id: z.string().uuid().describe("Article unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              article: z.object({
                id: z.string().uuid(),
                title: z.string(),
                slug: z.string(),
                content: z.string(),
                excerpt: z.string().optional(),
                imageUrl: z.string().url().optional(),
                category: z.string(),
                tags: z.string().optional(),
                isFeatured: z.boolean(),
                status: ArticleStatusEnum,
                author: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string().email(),
                }),
                publishedAt: z.string().datetime().optional(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Article fetched successfully"),
          404: z.object({ message: z.string() }).describe("Article not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getArticleByIdHandler
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["articles"],
        description: "Update article by ID",
        params: z.object({
          id: z.string().uuid().describe("Article unique identifier"),
        }),
        body: createArticleSchema.partial(),
        response: {
          200: z
            .object({
              message: z.string(),
              updated: z.object({
                id: z.string().uuid(),
                title: z.string(),
                slug: z.string(),
                content: z.string(),
                excerpt: z.string().optional(),
                imageUrl: z.string().url().optional(),
                category: z.string(),
                tags: z.string().optional(),
                isFeatured: z.boolean(),
                status: ArticleStatusEnum,
                authorId: z.string().uuid(),
                publishedAt: z.string().datetime().optional(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Article updated successfully"),
          404: z.object({ message: z.string() }).describe("Article not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    updateArticleHandler
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["articles"],
        description: "Delete article by ID",
        params: z.object({
          id: z.string().uuid().describe("Article unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Article deleted successfully"),
          404: z.object({ message: z.string() }).describe("Article not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    deleteArticleHandler
  );
}
