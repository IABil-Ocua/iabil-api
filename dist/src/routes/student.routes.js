"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = studentRoutes;
const zod_1 = require("zod");
const student_schema_1 = require("../schemas/student.schema");
const student_controller_1 = require("../controllers/student.controller");
async function studentRoutes(app) {
    app.get("/", {
        schema: {
            tags: ["students"],
            description: "Fetch all students",
            response: {
                500: zod_1.z
                    .object({ message: zod_1.z.string() })
                    .describe("Internal server error"),
            },
        },
    }, student_controller_1.fetchStudentsHandler);
    app.get("/export", {
        schema: {
            tags: ["students"],
            description: "Export all students data as Excel file",
            response: {
                200: zod_1.z.unknown().describe("Excel file exported successfully"),
                500: zod_1.z
                    .object({ message: zod_1.z.string() })
                    .describe("Internal server error"),
            },
        },
    }, student_controller_1.exportExcelHandler);
    app.get("/:id", {
        schema: {
            tags: ["students"],
            description: "Fetch student information by ID",
            params: zod_1.z.object({
                id: zod_1.z.cuid().describe("Student unique identifier"),
            }),
            response: {
                200: zod_1.z
                    .object({
                    message: zod_1.z.string(),
                    student: student_schema_1.studentSchema,
                })
                    .describe("Student fetched successfully"),
                404: zod_1.z.object({ message: zod_1.z.string() }).describe("Student not found"),
                500: zod_1.z
                    .object({ message: zod_1.z.string() })
                    .describe("Internal server error"),
            },
        },
    }, student_controller_1.fetchStudentByIdHandler);
    app.post("/", {
        schema: {
            tags: ["students"],
            description: "Create new student and associated user account",
            body: student_schema_1.createStudentSchema,
            response: {
                400: zod_1.z
                    .object({ errorCode: zod_1.z.string(), message: zod_1.z.string() })
                    .describe("Bad request"),
                409: zod_1.z
                    .object({ errorCode: zod_1.z.string(), message: zod_1.z.string() })
                    .describe("Conflict"),
                500: zod_1.z
                    .object({ errorCode: zod_1.z.string(), message: zod_1.z.string() })
                    .describe("Internal server error"),
            },
        },
    }, student_controller_1.createStudentHandler);
    app.put("/:id", {
        schema: {
            tags: ["students"],
            description: "Update student information by ID",
            params: zod_1.z.object({
                id: zod_1.z.cuid().describe("Student unique identifier"),
            }),
            body: student_schema_1.updateStudentSchema,
            response: {
                200: zod_1.z
                    .object({
                    message: zod_1.z.string(),
                    student: student_schema_1.studentSchema,
                })
                    .describe("Student updated successfully"),
                400: zod_1.z.object({ message: zod_1.z.string() }).describe("Bad request"),
                404: zod_1.z.object({ message: zod_1.z.string() }).describe("Student not found"),
                500: zod_1.z
                    .object({ message: zod_1.z.string() })
                    .describe("Internal server error"),
            },
        },
    }, student_controller_1.updateStudentHandler);
    app.delete("/:id", {
        schema: {
            tags: ["students"],
            description: "Delete a student by ID",
            params: zod_1.z.object({
                id: zod_1.z.cuid().describe("Student unique identifier"),
            }),
            response: {
                200: zod_1.z
                    .object({ message: zod_1.z.string() })
                    .describe("Student deleted successfully"),
                404: zod_1.z.object({ message: zod_1.z.string() }).describe("Student not found"),
                500: zod_1.z
                    .object({ message: zod_1.z.string() })
                    .describe("Internal server error"),
            },
        },
    }, student_controller_1.deleteStudentHandler);
}
//# sourceMappingURL=student.routes.js.map