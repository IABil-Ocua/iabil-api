"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobVacanciesRoutes = jobVacanciesRoutes;
const zod_1 = __importDefault(require("zod"));
const job_vacancy_controller_1 = require("../controllers/job-vacancy.controller");
const job_vacancies_schema_1 = require("../schemas/job-vacancies.schema");
async function jobVacanciesRoutes(app) {
    app.get("/", {
        schema: {
            tags: ["job-vacancies"],
            description: "List  all job vacancies",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    jobVacancies: zod_1.default.array(job_vacancies_schema_1.jobVacancySchema),
                })
                    .describe("Job vacancies fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, job_vacancy_controller_1.getJobVacanciesHandler);
    app.get("/:id", {
        schema: {
            tags: ["job-vacancies"],
            description: "Get job vacancy information by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Job vacancy unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    jobVacancy: job_vacancies_schema_1.jobVacancySchema,
                })
                    .describe("Job vacancy fetched successfully"),
                404: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Job vacancy not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, job_vacancy_controller_1.getJobVacancyByIdHandler);
    app.post("/", {
        schema: {
            tags: ["job-vacancies"],
            description: "Create job vacancy",
            body: job_vacancies_schema_1.createJobVacancySchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    jobVacancy: job_vacancies_schema_1.jobVacancySchema,
                })
                    .describe("Job vacancy created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, job_vacancy_controller_1.createJobVacancyHandler);
    app.put("/:id", {
        schema: {
            tags: ["job-vacancies"],
            description: "Update job vacancy by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Job vacancy unique identifier"),
            }),
            body: job_vacancies_schema_1.updateJobVacancySchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    jobVacancy: job_vacancies_schema_1.jobVacancySchema,
                })
                    .describe("Job vacancy updated successfully"),
                404: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Job vacancy not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, job_vacancy_controller_1.updateJobVacancyHandler);
    app.delete("/:id", {
        schema: {
            tags: ["job-vacancies"],
            description: "Delete job vacancy by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Job vacancy unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Job vacancy deleted successfully"),
                404: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Job vacancy not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, job_vacancy_controller_1.deleteJobVacancyHandler);
}
//# sourceMappingURL=job-vacancies.routes.js.map