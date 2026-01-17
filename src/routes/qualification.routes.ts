import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createQualificationHandler,
  deleteQualificationHandler,
  fetchQualificationHandler,
  fetchQualificationsHandler,
  updateQualificationHandler,
} from "../controllers/qualification.controller";

import {
  createQualificationSchema,
  qualificationSchema,
  updateQualificationSchema,
} from "../schemas/qualification.schema";

export async function qualificationRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Fetch all Qualifications",
        response: {
          200: z
            .object({
              message: z.string(),
              qualifications: z.array(qualificationSchema),
            })
            .describe("Qualifications fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQualificationsHandler
  );

  app.get(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Fetch Qualification by ID",
        params: z.object({
          id: z.string().uuid().describe("Qualification unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              qualification: qualificationSchema,
            })
            .describe("Qualification fetched successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQualificationHandler
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Create Qualification",
        body: createQualificationSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              qualification: qualificationSchema,
            })
            .describe("Qualification created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createQualificationHandler
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Update Qualification",
        body: updateQualificationSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              qualification: qualificationSchema,
            })
            .describe("Qualification updated successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateQualificationHandler
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["qualifications"],
        description: "Delete qualification by ID",
        params: z.object({
          id: z.string().uuid().describe("Qualification unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Qualification deleted successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteQualificationHandler
  );
}
