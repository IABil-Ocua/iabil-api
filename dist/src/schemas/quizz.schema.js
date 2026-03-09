"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuizzSchema = exports.createQuizzSchema = exports.quizzWithRelationsSchema = exports.quizzSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const chapter_schema_1 = require("./chapter.schema");
const quizz_items_schema_1 = require("./quizz-items.schema");
exports.quizzSchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    name: zod_1.default.string(),
    chapterId: zod_1.default.string(),
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
});
exports.quizzWithRelationsSchema = zod_1.default.lazy(() => exports.quizzSchema.extend({
    chapter: chapter_schema_1.chapterSchema,
    quizzItems: zod_1.default.array(quizz_items_schema_1.quizzItemSchema),
}));
exports.createQuizzSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Quizz name is required"),
    chapterId: zod_1.default.string().min(1, "Chapter ID is required"),
});
exports.updateQuizzSchema = exports.createQuizzSchema.partial();
//# sourceMappingURL=quizz.schema.js.map