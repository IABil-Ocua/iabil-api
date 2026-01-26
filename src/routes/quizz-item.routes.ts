import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createQuizzItemHandler,
  deleteQuizzItemHandler,
  fetchQuizzItemHandler,
  fetchQuizzItemsHandler,
  updateQuizzItemHandler,
} from "../controllers/quizz-item.controller";
import {
  quizzItemSchema,
  createQuizzItemSchema,
  updateQuizzItemSchema,
} from "../schemas/quizz-items.schema";

export async function quizzItemRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizz-items"],
        description: "Fetch all quizz items",
        response: {
          200: z
            .object({
              message: z.string(),
              quizzItems: z.array(quizzItemSchema),
            })
            .describe("Quizz items fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQuizzItemsHandler
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizz-items"],
        description: "Fetch quizz item by ID",
        params: z.object({
          id: z.cuid().describe("Quizz item unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              quizzItem: quizzItemSchema,
            })
            .describe("Quizz item fetched successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQuizzItemHandler
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizz-items"],
        description: "Create quizz item",
        body: createQuizzItemSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              quizzItem: quizzItemSchema,
            })
            .describe("Quizz item created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createQuizzItemHandler
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizz-items"],
        description: "Update quizz item by ID",
        params: z.object({
          id: z.cuid().describe("Quizz item unique identifier"),
        }),
        body: updateQuizzItemSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              quizzItem: quizzItemSchema,
            })
            .describe("Quizz item updated successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateQuizzItemHandler
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizz-items"],
        description: "Delete quizz item by ID",
        params: z.object({
          id: z.cuid().describe("Quizz item unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Quizz item deleted successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteQuizzItemHandler
  );
}