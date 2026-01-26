import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createScholarshipHandler,
  deleteScholarshipHandler,
  getScholarshipByIdHandler,
  getScholarshipsHandler,
  updateScholarshipHandler,
} from "../controllers/scholarship.controller";

import {
  scholarshipSchema,
  createScholarshipSchema,
  updateScholarshipSchema,
} from "../schemas/shcolarship.schema";


const scholarshipStatusEnum = z.enum(["ACTIVE", "INACTIVE", "CLOSED"]);

export async function scholarshipRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      schema: {
        tags: ["scholarships"],
        description: "List all scholarships",
        response: {
          200: z
            .object({
              message: z.string(),
              scholarships: z.array(scholarshipSchema),
            })
            .describe("Scholarships fetched successfully"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getScholarshipsHandler
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["scholarships"],
        description: "Get scholarship information by ID",
        params: z.object({
          id: z.cuid().describe("Scholarship unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              scholarship: scholarshipSchema,
            })
            .describe("Scholarship fetched successfully"),
          404: z.object({ message: z.string() }).describe("Scholarship not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getScholarshipByIdHandler
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["scholarships"],
        description: "Create a new scholarship",
        body: createScholarshipSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              scholarship: scholarshipSchema,
            })
            .describe("Scholarship created successfully"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    createScholarshipHandler
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["scholarships"],
        description: "Update scholarship by ID",
        params: z.object({
          id: z.cuid().describe("Scholarship unique identifier"),
        }),
        body: updateScholarshipSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              scholarship: scholarshipSchema,
            })
            .describe("Scholarship updated successfully"),
          404: z.object({ message: z.string() }).describe("Scholarship not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    updateScholarshipHandler
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["scholarships"],
        description: "Delete a scholarship by ID",
        params: z.object({
          id: z.cuid().describe("Scholarship unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Scholarship deleted successfully"),
          404: z.object({ message: z.string() }).describe("Scholarship not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    deleteScholarshipHandler
  );
}
