"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQualificationSchema = exports.createQualificationSchema = exports.qualificationWithRelationsSchema = exports.qualificationSchema = void 0;
const zod_1 = require("zod");
const qualification_level_schema_1 = require("./qualification-level.schema");
exports.qualificationSchema = zod_1.z.object({
    id: zod_1.z.cuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    bannerUrl: zod_1.z.string().nullable(),
    workload: zod_1.z.number().int().positive().nullable(),
    credits: zod_1.z.number().int().positive().nullable(),
    knowledgeAreas: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date().nullable(),
    updatedAt: zod_1.z.coerce.date().nullable(),
});
exports.qualificationWithRelationsSchema = zod_1.z.lazy(() => exports.qualificationSchema.extend({
    levels: zod_1.z.array(qualification_level_schema_1.levelSchema).nullable(),
}));
exports.createQualificationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    bannerUrl: zod_1.z.string().nullable().optional(),
    workload: zod_1.z.number().int().positive(),
    credits: zod_1.z.number().int().positive(),
    knowledgeAreas: zod_1.z.string().optional(),
});
exports.updateQualificationSchema = exports.createQualificationSchema.partial();
//# sourceMappingURL=qualification.schema.js.map