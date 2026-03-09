"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChapterSchema = exports.createChapterSchema = exports.chapterWithRelationsSchema = exports.chapterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const quizz_schema_1 = require("./quizz.schema");
const module_schema_1 = require("./module.schema");
exports.chapterSchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    supplementaryMaterialUrl1: zod_1.default.string().nullable(),
    supplementaryMaterialUrl2: zod_1.default.string().nullable(),
    moduleId: zod_1.default.string(),
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
});
exports.chapterWithRelationsSchema = zod_1.default.lazy(() => exports.chapterSchema.extend({
    module: module_schema_1.moduleSchema,
    quizzes: zod_1.default.array(quizz_schema_1.quizzSchema),
}));
exports.createChapterSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title is required"),
    content: zod_1.default.string().min(1, "Content is required"),
    supplementaryMaterialUrl1: zod_1.default.string().optional(),
    supplementaryMaterialUrl2: zod_1.default.string().optional(),
    moduleId: zod_1.default.string().min(1, "Module ID is required"),
});
exports.updateChapterSchema = exports.createChapterSchema.partial();
//# sourceMappingURL=chapter.schema.js.map