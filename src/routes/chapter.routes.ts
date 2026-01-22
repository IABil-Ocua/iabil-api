import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createChapterHandler,
  deleteChapterHandler,
  fetchChapterHandler,
  fetchChaptersByLevelHandler,
  fetchChaptersHandler,
} from "../controllers/chapter.controller";
import {
  chapterSchema,
  chapterWithRelationsSchema,
  createChapterSchema,
  updateChapterSchema,
} from "../schemas/chapter.schema";

export async function chapterRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Fetch all chapters",
        response: {
          200: z
            .object({
              message: z.string(),
              chapters: z.array(chapterWithRelationsSchema),
            })
            .describe("Chapters Fetched succesfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchChaptersHandler,
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Fetch chapter by ID",
        response: {
          200: z
            .object({
              message: z.string(),
              chapter: chapterWithRelationsSchema,
            })
            .describe("Chapter fetched successfully"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchChapterHandler,
  );

  app.get(
    "/levels/:levelId",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Fetch chapters by level",
        response: {
          200: z
            .object({
              message: z.string(),
              chapters: z.array(chapterWithRelationsSchema),
            })
            .describe("Chapter fetched successfully"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchChaptersByLevelHandler,
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Create chapter",
        body: createChapterSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              chapter: chapterSchema,
            })
            .describe("Chapter created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createChapterHandler,
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Update chapter",
        body: updateChapterSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              chapter: chapterSchema,
            })
            .describe("Chapter updated successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createChapterHandler,
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Delete chapter",
        response: {
          200: z
            .object({
              message: z.string(),
            })
            .describe("Chapter deleted successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteChapterHandler,
  );
}
