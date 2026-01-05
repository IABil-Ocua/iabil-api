import {
  createScholarshipHandler,
  deleteScholarshipHandler,
  getScholarshipByIdHandler,
  getScholarshipsHandler,
  updateScholarshipHandler,
} from "../controllers/scholarship.controller";
import { FastifyTypedInstance } from "../types/zod";
import { scholarshipSchema } from "../schemas/shcolarship.schema";
import z from "zod";

const scholarshipStatusEnum = z.enum(["ACTIVE", "INACTIVE", "CLOSED"]);

export async function scholarshipRoutes(app: FastifyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["scholarships"],
        description: "Create a new scholarship",
        body: z.object({
          name: z.string().min(1, "Name is required"),
          description: z.string().optional(),
          sponsor: z.string().optional(),
          amount: z.number().positive().optional(),
          type: z.string().min(1, "Type is required"),
          startDate: z.coerce.date().optional(),
          endDate: z.coerce.date().optional(),
          status: scholarshipStatusEnum.default("INACTIVE"),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
              scholarship: z.object({
                id: z.string().cuid(),
                name: z.string(),
                description: z.string().nullable(),
                sponsor: z.string().nullable(),
                amount: z.number().nullable(),
                type: z.string(),
                startDate: z.date().nullable(),
                endDate: z.date().nullable(),
                status: scholarshipStatusEnum,
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Scholarship created successfully"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    createScholarshipHandler
  );

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
              scholarships: z.array(
                z.object({
                  id: z.string().cuid(),
                  name: z.string(),
                  description: z.string().nullable(),
                  sponsor: z.string().nullable(),
                  amount: z.number().nullable(),
                  type: z.string(),
                  startDate: z.date().nullable(),
                  endDate: z.date().nullable(),
                  status: scholarshipStatusEnum,
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
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
          id: z.string().cuid().describe("Scholarship unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              scholarships: z.object({
                id: z.string().cuid(),
                name: z.string(),
                description: z.string().nullable(),
                sponsor: z.string().nullable(),
                amount: z.number().nullable(),
                type: z.string(),
                startDate: z.date().nullable(),
                endDate: z.date().nullable(),
                status: scholarshipStatusEnum,
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Scholarship fetched successfully"),
          404: z.object({ message: z.string() }).describe("Scholarship not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getScholarshipByIdHandler
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["scholarships"],
        description: "Update scholarship by ID",
        params: z.object({
          id: z.string().cuid().describe("Scholarship unique identifier"),
        }),
        body: scholarshipSchema.partial(),
        response: {
          200: z
            .object({
              message: z.string(),
              scholarship: z.object({
                id: z.string().cuid(),
                name: z.string(),
                description: z.string().nullable(),
                sponsor: z.string().nullable(),
                amount: z.number().nullable(),
                type: z.string(),
                startDate: z.date().nullable(),
                endDate: z.date().nullable(),
                status: scholarshipStatusEnum,
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
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
          id: z.string().cuid().describe("Scholarship unique identifier"),
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
