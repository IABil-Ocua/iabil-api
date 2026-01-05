import {
  createJobVacancyHandler,
  deleteJobVacancyHandler,
  getJobVacanciesHandler,
  getJobVacancyByIdHandler,
  updateJobVacancyHandler,
} from "../controllers/job-vacancy.controller";
import { FastifyTypedInstance } from "../types/zod";
import { createJobVacancySchema } from "../schemas/job-vacancies.schema";
import z from "zod";

export async function jobVacanciesRoutes(app: FastifyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["job-vacancies"],
        description: "Create job vacancy",
        body: z.object({
          title: z.string().min(3, "Title must be at least 3 characters"),
          companyName: z.string().min(2, "Company name is required"),
          url: z.string().url("Valid URL is required"),
          location: z.string().min(5, "Location is required"),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
              jobVacancy: z.object({
                id: z.string().cuid(),
                title: z.string(),
                companyName: z.string(),
                url: z.string().url(),
                location: z.string(),
                publishedAt: z.date(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Job vacancy created successfully"),
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    createJobVacancyHandler
  );

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
              jobVacancies: z.array(
                z.object({
                  id: z.string().cuid(),
                  title: z.string(),
                  companyName: z.string(),
                  url: z.string().url(),
                  location: z.string(),
                  publishedAt: z.date(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
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
              jobVacancy: z.object({
                id: z.string().cuid(),
                title: z.string(),
                companyName: z.string(),
                url: z.string().url(),
                location: z.string(),
                publishedAt: z.date(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Job vacancy fetched successfully"),
          404: z.object({ message: z.string() }).describe("Job vacancy not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    getJobVacancyByIdHandler
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
        body: createJobVacancySchema.partial(),
        response: {
          200: z
            .object({
              message: z.string(),
              jobVacancy: z.object({
                id: z.string().cuid(),
                title: z.string(),
                companyName: z.string(),
                url: z.string().url(),
                location: z.string(),
                publishedAt: z.date(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
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
