"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelRoutes = levelRoutes;
const zod_1 = __importDefault(require("zod"));
const level_controller_1 = require("../controllers/level.controller");
const qualification_level_schema_1 = require("../schemas/qualification-level.schema");
async function levelRoutes(app) {
    app.get("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["levels"],
            description: "Fetch all Levels",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    levels: zod_1.default.array(qualification_level_schema_1.levelWithRelationsSchema),
                })
                    .describe("Qualification levels fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, level_controller_1.fetchLevelsHandler);
    app.get("/qualifications/:qualificationId", {
        preHandler: app.authenticate,
        schema: {
            tags: ["levels"],
            description: "Fetch levels by qualification",
            params: zod_1.default.object({
                qualificationId: zod_1.default.cuid().describe("Qualification unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    levels: zod_1.default.array(qualification_level_schema_1.levelWithRelationsSchema),
                })
                    .describe("Qualification levels fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, level_controller_1.fetchLevelsByQualificationsHandler);
    app.get("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["levels"],
            description: "Fetch qualification level by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Qualification level unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    level: qualification_level_schema_1.levelWithRelationsSchema,
                })
                    .describe("Qualification level fetched successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Level not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, level_controller_1.fetchLevelHandler);
    app.post("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["levels"],
            description: "Create qualification level",
            body: qualification_level_schema_1.createLevelSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    level: qualification_level_schema_1.levelSchema,
                })
                    .describe("Qualification level created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, level_controller_1.createLevelHandler);
    app.put("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["levels"],
            description: "Update qualification level by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Qualification level unique identifier"),
            }),
            body: qualification_level_schema_1.updateLevelSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    level: qualification_level_schema_1.levelSchema,
                })
                    .describe("Qualification level updated successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Level not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, level_controller_1.updateLevelHandler);
    app.delete("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["levels"],
            description: "Delete qualification level by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Qualification level unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Qualification level deleted successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Level not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, level_controller_1.deleteLevelHandler);
}
//# sourceMappingURL=level.route.js.map