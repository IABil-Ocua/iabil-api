"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qualificationRoutes = qualificationRoutes;
const zod_1 = __importDefault(require("zod"));
const qualification_controller_1 = require("../controllers/qualification.controller");
const qualification_schema_1 = require("../schemas/qualification.schema");
async function qualificationRoutes(app) {
    app.get("/", {
        schema: {
            tags: ["qualifications"],
            description: "Fetch all Qualifications",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    qualifications: zod_1.default.array(qualification_schema_1.qualificationWithRelationsSchema),
                })
                    .describe("Qualifications fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, qualification_controller_1.fetchQualificationsHandler);
    app.get("/:id", {
        schema: {
            tags: ["qualifications"],
            description: "Fetch Qualification by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Qualification unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    qualification: qualification_schema_1.qualificationWithRelationsSchema,
                })
                    .describe("Qualification fetched successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, qualification_controller_1.fetchQualificationHandler);
    app.post("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["qualifications"],
            description: "Create Qualification",
            body: qualification_schema_1.createQualificationSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    qualification: qualification_schema_1.qualificationSchema,
                })
                    .describe("Qualification created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, qualification_controller_1.createQualificationHandler);
    app.put("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["qualifications"],
            description: "Update Qualification",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Qualification unique identifier"),
            }),
            body: qualification_schema_1.updateQualificationSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    qualification: qualification_schema_1.qualificationSchema,
                })
                    .describe("Qualification updated successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, qualification_controller_1.updateQualificationHandler);
    app.delete("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["qualifications"],
            description: "Delete qualification by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Qualification unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Qualification deleted successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, qualification_controller_1.deleteQualificationHandler);
}
//# sourceMappingURL=qualification.routes.js.map