import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createArticleHandler,
  getArticlesHandler,
  getArticleByIdHandler,
  getRecentArticlesHandler,
  updateArticleHandler,
  deleteArticleHandler,
} from "../controllers/article.controller";
import {
  createArticleSchema,
  ArticleStatusEnum,
  articleSchema,
  updateArticleSchema,
  articleWithRelationsSchema,
} from "../schemas/article.schema";

export async function articleRoutes(app: FastifyTypedInstance) {
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
              articles: z.array(articleWithRelationsSchema),
            })
            .describe("Articles fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    getArticlesHandler,
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
              articles: z.array(articleSchema),
            })
            .describe("Recent articles fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    getRecentArticlesHandler,
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["articles"],
        description: "Get article information by ID",
        params: z.object({
          id: z.cuid().describe("Article unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              article: articleWithRelationsSchema,
            })
            .describe("Article fetched successfully"),
          404: z.object({ message: z.string() }).describe("Article not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    getArticleByIdHandler,
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["articles"],
        description: "Create new article",
        body: createArticleSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              article: articleSchema,
            })
            .describe("Article created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createArticleHandler,
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["articles"],
        description: "Update article by ID",
        params: z.object({
          id: z.cuid().describe("Article unique identifier"),
        }),
        body: updateArticleSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              article: articleSchema,
            })
            .describe("Article updated successfully"),
          404: z.object({ message: z.string() }).describe("Article not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateArticleHandler,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["articles"],
        description: "Delete article by ID",
        params: z.object({
          id: z.cuid().describe("Article unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Article deleted successfully"),
          404: z.object({ message: z.string() }).describe("Article not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteArticleHandler,
  );
}
