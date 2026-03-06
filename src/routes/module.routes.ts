import z from "zod";
import { FastifyTypedInstance } from "../types/zod";
import {
  createModuleHandler,
  deleteModuleHandler,
  fetchModuleHandler,
  fetchModulesHandler,
  updateModuleHandler,
} from "../controllers/module.controller";
import {
  createModuleSchema,
  moduleSchema,
  moduleWithRelationsSchema,
  updateModuleSchema,
} from "../schemas/module.schema";

export async function moduleRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["modules"],
        description: "Fetch all modules",
        response: {
          /** 200: z
            .object({
              message: z.string(),
              modules: z.array(moduleWithRelationsSchema),
            })
            .describe("Modules fetched successfully"), */
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchModulesHandler,
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["modules"],
        description: "Fetch module by ID",
        params: z.object({
          id: z.cuid().describe("Module unique identifier"),
        }),
        response: {
          /**200: z
            .object({
              message: z.string(),
              module: moduleWithRelationsSchema,
            })
            .describe("Module fetched successfully"), */
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchModuleHandler,
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["modules"],
        description: "Create module",
        body: createModuleSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              module: moduleSchema,
            })
            .describe("Module created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createModuleHandler,
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["modules"],
        description: "Update module",
        params: z.object({
          id: z.cuid().describe("Module unique identifier"),
        }),
        body: updateModuleSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              module: moduleSchema,
            })
            .describe("Module updated successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateModuleHandler,
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["modules"],
        description: "Delete module",
        params: z.object({
          id: z.cuid().describe("Module unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
            })
            .describe("Module deleted successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteModuleHandler,
  );
}
