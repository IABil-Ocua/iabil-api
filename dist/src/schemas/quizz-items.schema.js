"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQuizzAnswerSchema = exports.updateQuizzItemSchema = exports.createQuizzItemSchema = exports.quizzItemsWithRelationsSchema = exports.quizzItemSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const quizz_schema_1 = require("./quizz.schema");
exports.quizzItemSchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    question: zod_1.default.string(),
    option1: zod_1.default.string(),
    option2: zod_1.default.string(),
    option3: zod_1.default.string().nullable(),
    option4: zod_1.default.string().nullable(),
    answer: zod_1.default.string(),
    quizzId: zod_1.default.string(),
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
});
exports.quizzItemsWithRelationsSchema = zod_1.default.lazy(() => exports.quizzItemSchema.extend({
    quizz: quizz_schema_1.quizzSchema,
}));
exports.createQuizzItemSchema = zod_1.default.object({
    question: zod_1.default.string().min(1, "Question is required"),
    option1: zod_1.default.string().min(1, "Option 1 is required"),
    option2: zod_1.default.string().min(1, "Option 1 is required"),
    option3: zod_1.default.string().optional(),
    option4: zod_1.default.string().optional(),
    answer: zod_1.default.string().min(1, "Answer is required"),
    quizzId: zod_1.default.string().min(1, "Quizz ID 1 is required"),
});
exports.updateQuizzItemSchema = exports.createQuizzItemSchema.partial();
exports.checkQuizzAnswerSchema = zod_1.default.object({
    quizzItemId: zod_1.default.string().min(1, "Quizz item ID is required"),
    studentAnswer: zod_1.default.string().min(1, "Student answer is required"),
});
//# sourceMappingURL=quizz-items.schema.js.map