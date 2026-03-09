"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScholarshipSchema = exports.createScholarshipSchema = exports.scholarshipSchema = void 0;
const zod_1 = require("zod");
exports.scholarshipSchema = zod_1.z.object({
    id: zod_1.z.cuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    sponsor: zod_1.z.string().nullable(),
    amount: zod_1.z.number().nullable(),
    type: zod_1.z.string(),
    startDate: zod_1.z.coerce.date().nullable(),
    endDate: zod_1.z.coerce.date().nullable(),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE", "CLOSED"]),
    createdAt: zod_1.z.coerce.date().nullable(),
    updatedAt: zod_1.z.coerce.date().nullable(),
});
exports.createScholarshipSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().optional(),
    sponsor: zod_1.z.string().optional(),
    amount: zod_1.z.number().optional(),
    type: zod_1.z.string().min(1, "Scholarship type is required"),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE", "CLOSED"]),
});
exports.updateScholarshipSchema = exports.createScholarshipSchema.partial();
//# sourceMappingURL=scholarship.schema.js.map