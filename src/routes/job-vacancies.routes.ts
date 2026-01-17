import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createJobVacancyHandler,
  deleteJobVacancyHandler,
  getJobVacanciesHandler,
  getJobVacancyByIdHandler,
  updateJobVacancyHandler,
} from "../controllers/job-vacancy.controller";
import {
  jobVacancySchema, 
  createJobVacancySchema,
  updateJobVacancySchema,
 } from "../schemas/job-vacancies.schema";

export async function jobVacanciesRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      schema: {
        tags: ["job-vacancies"],
        description: "List  all job vacancies",
        response: {
          200: z
            .object({
              message: z.string(),
              jobVacancies: z.array(jobVacancySchema),
            })
            .describe("Job vacancies fetched successfully"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getJobVacanciesHandler
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["job-vacancies"],
        description: "Get job vacancy information by ID",
        params: z.object({
          id: z.string().cuid().describe("Job vacancy unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              jobVacancy: jobVacancySchema,
            })
            .describe("Job vacancy fetched successfully"),
          404: z.object({ message: z.string() }).describe("Job vacancy not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getJobVacancyByIdHandler
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["job-vacancies"],
        description: "Create job vacancy",
        body: createJobVacancySchema,
        response: {
          201: z
            .object({
              message: z.string(),
              jobVacancy: jobVacancySchema,
            })
            .describe("Job vacancy created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    createJobVacancyHandler
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["job-vacancies"],
        description: "Update job vacancy by ID",
        params: z.object({
          id: z.string().cuid().describe("Job vacancy unique identifier"),
        }),
        body: updateJobVacancySchema,
        response: {
          200: z
            .object({
              message: z.string(),
              jobVacancy: jobVacancySchema,
            })
            .describe("Job vacancy updated successfully"),
          404: z.object({ message: z.string() }).describe("Job vacancy not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    updateJobVacancyHandler
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["job-vacancies"],
        description: "Delete job vacancy by ID",
        params: z.object({
          id: z.string().cuid().describe("Job vacancy unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Job vacancy deleted successfully"),
          404: z.object({ message: z.string() }).describe("Job vacancy not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    deleteJobVacancyHandler
  );
}
