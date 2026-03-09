"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterRoutes = chapterRoutes;
const zod_1 = __importDefault(require("zod"));
const chapter_controller_1 = require("../controllers/chapter.controller");
const chapter_schema_1 = require("../schemas/chapter.schema");
async function chapterRoutes(app) {
    app.get("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["chapters"],
            description: "Fetch all chapters",
            response: {
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, chapter_controller_1.fetchChaptersHandler);
    app.get("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["chapters"],
            description: "Fetch chapter by ID",
            response: {
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, chapter_controller_1.fetchChapterHandler);
    app.get("/modules/:moduleId", {
        preHandler: app.authenticate,
        schema: {
            tags: ["chapters"],
            description: "Fetch chapters by module",
            params: zod_1.default.object({
                moduleId: zod_1.default.cuid().describe("Module unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    chapters: zod_1.default.array(chapter_schema_1.chapterWithRelationsSchema),
                })
                    .describe("Chapters fetched successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, chapter_controller_1.fetchChaptersByModuleHandler);
    app.post("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["chapters"],
            description: "Create chapter",
            body: chapter_schema_1.createChapterSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    chapter: chapter_schema_1.chapterSchema,
                })
                    .describe("Chapter created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, chapter_controller_1.createChapterHandler);
    app.put("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["chapters"],
            description: "Update chapter",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Chapter unique identifier"),
            }),
            body: chapter_schema_1.updateChapterSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    chapter: chapter_schema_1.chapterSchema,
                })
                    .describe("Chapter updated successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, chapter_controller_1.updateChapterHandler);
    app.delete("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["chapters"],
            description: "Delete chapter",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Chapter unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                })
                    .describe("Chapter deleted successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, chapter_controller_1.deleteChapterHandler);
}
//# sourceMappingURL=chapter.routes.js.map