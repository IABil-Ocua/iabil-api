"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateModuleSchema = exports.createModuleSchema = exports.moduleWithRelationsSchema = exports.moduleSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const qualification_level_schema_1 = require("./qualification-level.schema");
const chapter_schema_1 = require("./chapter.schema");
exports.moduleSchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    title: zod_1.default.string(),
    description: zod_1.default.string().nullable(),
    workload: zod_1.default.number().int().positive(),
    levelId: zod_1.default.string(),
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
});
exports.moduleWithRelationsSchema = zod_1.default.lazy(() => exports.moduleSchema.extend({
    level: qualification_level_schema_1.levelSchema,
    chapters: zod_1.default.array(chapter_schema_1.chapterSchema),
}));
exports.createModuleSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().nullable(),
    workload: zod_1.default.number().int().positive(),
    levelId: zod_1.default.string(),
    documentUrl: zod_1.default.string(),
});
exports.updateModuleSchema = exports.createModuleSchema.partial();
//# sourceMappingURL=module.schema.js.map