import z from "zod";
import { FastifyTypedInstance } from "../types/zod";
import {
  createLevelHandler,
  deleteLevelHandler,
  fetchLevelHandler,
  fetchLevelsHandler,
  updateLevelHandler,
} from "../controllers/qualification-level.controller";

export async function levelRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Levels"],
        description: "Fetch all Levels",
        response: {
          200: z
            .object({
              message: z.string(),
              levels: z.array(
                z.object({
                  id: z.string().uuid(),
                  title: z.string(),
                  description: z.string(),
                  noticeUrl: z.string().nullable(),
                  qualificationId: z.string(),
                  qualification: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    description: z.string().nullable(),
                  }),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            })
            .describe("Qualification levels fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchLevelsHandler
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Fetch qualification level by ID",
        params: z.object({
          id: z.string().uuid().describe("Qualification level unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              level: z.object({
                id: z.string().uuid(),
                title: z.string(),
                description: z.string(),
                noticeUrl: z.string().nullable(),
                qualificationId: z.string(),
                qualification: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  description: z.string().nullable(),
                }),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Qualification level fetched successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Level not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchLevelHandler
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Create qualification level",
        body: z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().min(1, "Description is required"),
          noticeUrl: z.string().url().optional(),
          qualificationId: z.string().uuid(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
              level: z.object({
                id: z.string().uuid(),
                title: z.string(),
                description: z.string(),
                noticeUrl: z.string().nullable(),
                qualificationId: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Qualification level created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createLevelHandler
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Update qualification level by ID",
        params: z.object({
          id: z.string().uuid().describe("Qualification level unique identifier"),
        }),
        body: z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().min(1, "Description is required"),
          noticeUrl: z.string().url().optional(),
          qualificationId: z.string().uuid(),
        }).partial(),
        response: {
          200: z
            .object({
              message: z.string(),
              level: z.object({
                id: z.string().uuid(),
                title: z.string(),
                description: z.string(),
                noticeUrl: z.string().nullable(),
                qualificationId: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Qualification level updated successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Level not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateLevelHandler
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Delete qualification level by ID",
        params: z.object({
          id: z.string().uuid().describe("Qualification level unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Qualification level deleted successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Level not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteLevelHandler
  );
}
