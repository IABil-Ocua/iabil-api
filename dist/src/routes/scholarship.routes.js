"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scholarshipRoutes = scholarshipRoutes;
const zod_1 = __importDefault(require("zod"));
const scholarship_controller_1 = require("../controllers/scholarship.controller");
const scholarship_schema_1 = require("../schemas/scholarship.schema");
async function scholarshipRoutes(app) {
    app.get("/", {
        schema: {
            tags: ["scholarships"],
            description: "List all scholarships",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    scholarships: zod_1.default.array(scholarship_schema_1.scholarshipSchema),
                })
                    .describe("Scholarships fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, scholarship_controller_1.getScholarshipsHandler);
    app.get("/:id", {
        schema: {
            tags: ["scholarships"],
            description: "Get scholarship information by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Scholarship unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    scholarship: scholarship_schema_1.scholarshipSchema,
                })
                    .describe("Scholarship fetched successfully"),
                404: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Scholarship not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, scholarship_controller_1.getScholarshipByIdHandler);
    app.post("/", {
        schema: {
            tags: ["scholarships"],
            description: "Create a new scholarship",
            body: scholarship_schema_1.createScholarshipSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    scholarship: scholarship_schema_1.scholarshipSchema,
                })
                    .describe("Scholarship created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, scholarship_controller_1.createScholarshipHandler);
    app.put("/:id", {
        schema: {
            tags: ["scholarships"],
            description: "Update scholarship by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Scholarship unique identifier"),
            }),
            body: scholarship_schema_1.updateScholarshipSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    scholarship: scholarship_schema_1.scholarshipSchema,
                })
                    .describe("Scholarship updated successfully"),
                404: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Scholarship not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, scholarship_controller_1.updateScholarshipHandler);
    app.delete("/:id", {
        schema: {
            tags: ["scholarships"],
            description: "Delete a scholarship by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Scholarship unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Scholarship deleted successfully"),
                404: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Scholarship not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, scholarship_controller_1.deleteScholarshipHandler);
}
//# sourceMappingURL=scholarship.routes.js.map