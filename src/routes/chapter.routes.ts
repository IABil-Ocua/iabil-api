import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createChapterHandler,
  deleteChapterHandler,
  fetchChapterHandler,
  fetchChaptersByModuleHandler,
  fetchChaptersHandler,
  updateChapterHandler,
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
            .describe("Chapters fetched successfully"),
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
    "/modules/:moduleId",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Fetch chapters by module",
        params: z.object({
          moduleId: z.cuid().describe("Module unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              chapters: z.array(chapterWithRelationsSchema),
            })
            .describe("Chapters fetched successfully"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchChaptersByModuleHandler,
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
        params: z.object({
          id: z.cuid().describe("Chapter unique identifier"),
        }),
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
    updateChapterHandler,
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["chapters"],
        description: "Delete chapter",
        params: z.object({
          id: z.cuid().describe("Chapter unique identifier"),
        }),
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
