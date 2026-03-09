"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizzRoutes = quizzRoutes;
const zod_1 = __importDefault(require("zod"));
const quizz_controller_1 = require("../controllers/quizz.controller");
const quizz_schema_1 = require("../schemas/quizz.schema");
async function quizzRoutes(app) {
    app.get("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizzes"],
            description: "Fetch all quizzes",
            response: {
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_controller_1.fetchQuizzesHandler);
    app.get("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizzes"],
            description: "Fetch quiz by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Quiz unique identifier"),
            }),
            response: {
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_controller_1.fetchQuizzHandler);
    app.post("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizzes"],
            description: "Create quiz",
            body: quizz_schema_1.createQuizzSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    quizz: quizz_schema_1.quizzSchema,
                })
                    .describe("Quizz created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_controller_1.createQuizzHandler);
    app.put("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizzes"],
            description: "Update quiz by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Quiz unique identifier"),
            }),
            body: quizz_schema_1.updateQuizzSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    quizz: quizz_schema_1.quizzSchema,
                })
                    .describe("Quizz updated successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_controller_1.updateQuizzHandler);
    app.delete("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizzes"],
            description: "Delete quiz by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Quiz unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Quiz deleted successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_controller_1.deleteQuizzHandler);
}
//# sourceMappingURL=quizz.routes.js.map