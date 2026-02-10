import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createLevelHandler,
  deleteLevelHandler,
  fetchLevelHandler,
  fetchLevelsByQualificationsHandler,
  fetchLevelsHandler,
  updateLevelHandler,
} from "../controllers/qualification-level.controller";
import {
  levelSchema,
  createLevelSchema,
  updateLevelSchema,
  levelWithRelationsSchema,
} from "../schemas/qualification-level.schema";

export async function levelRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Fetch all Levels",
        response: {
          200: z
            .object({
              message: z.string(),
              levels: z.array(levelWithRelationsSchema),
            })
            .describe("Qualification levels fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchLevelsHandler,
  );

  app.get(
    "/qualifications/:qualificationId",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Fetch levels by qualification",
        response: {
          200: z
            .object({
              message: z.string(),
              levels: z.array(levelWithRelationsSchema),
            })
            .describe("Qualification levels fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchLevelsByQualificationsHandler,
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Fetch qualification level by ID",
        params: z.object({
          id: z.cuid().describe("Qualification level unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              level: levelWithRelationsSchema,
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
    fetchLevelHandler,
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Create qualification level",
        body: createLevelSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              level: levelSchema,
            })
            .describe("Qualification level created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createLevelHandler,
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Update qualification level by ID",
        params: z.object({
          id: z.cuid().describe("Qualification level unique identifier"),
        }),
        body: updateLevelSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              level: levelSchema,
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
    updateLevelHandler,
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["levels"],
        description: "Delete qualification level by ID",
        params: z.object({
          id: z.cuid().describe("Qualification level unique identifier"),
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
    deleteLevelHandler,
  );
}
