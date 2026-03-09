import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createQuizzHandler,
  deleteQuizzHandler,
  fetchQuizzHandler,
  fetchQuizzesHandler,
  updateQuizzHandler,
} from "../controllers/quizz.controller";
import {
  quizzSchema,
  createQuizzSchema,
  updateQuizzSchema,
} from "../schemas/quizz.schema";

export async function quizzRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizzes"],
        description: "Fetch all quizzes",
        response: {
          /**200: z
            .object({
              message: z.string(),
              quizzes: z.array(quizzWithRelationsSchema),
            })
            .describe("Quizzes fetched successfully"), */
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQuizzesHandler,
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizzes"],
        description: "Fetch quiz by ID",
        params: z.object({
          id: z.cuid().describe("Quiz unique identifier"),
        }),
        response: {
          /**200: z
            .object({
              message: z.string(),
              quizz: quizzSchema,
            })
            .describe("Quizz fetched successfully"), */
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQuizzHandler,
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizzes"],
        description: "Create quiz",
        body: createQuizzSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              quizz: quizzSchema,
            })
            .describe("Quizz created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createQuizzHandler,
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizzes"],
        description: "Update quiz by ID",
        params: z.object({
          id: z.cuid().describe("Quiz unique identifier"),
        }),
        body: updateQuizzSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              quizz: quizzSchema,
            })
            .describe("Quizz updated successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateQuizzHandler,
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["quizzes"],
        description: "Delete quiz by ID",
        params: z.object({
          id: z.cuid().describe("Quiz unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Quiz deleted successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteQuizzHandler,
  );
}
