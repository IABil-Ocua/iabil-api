"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLevelSchema = exports.createLevelSchema = exports.levelWithRelationsSchema = exports.levelSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const qualification_schema_1 = require("./qualification.schema");
const module_schema_1 = require("./module.schema");
exports.levelSchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    title: zod_1.default.string(),
    description: zod_1.default.string().nullable(),
    noticeUrl: zod_1.default.string().nullable(),
    qualificationId: zod_1.default.string(),
    createdAt: zod_1.default.coerce.date().nullable(),
    updatedAt: zod_1.default.coerce.date().nullable(),
});
exports.levelWithRelationsSchema = zod_1.default.lazy(() => exports.levelSchema.extend({
    qualification: qualification_schema_1.qualificationSchema,
    modules: zod_1.default.array(module_schema_1.moduleSchema),
}));
exports.createLevelSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    noticeUrl: zod_1.default.string(),
    qualificationId: zod_1.default.string(),
});
exports.updateLevelSchema = exports.createLevelSchema.partial();
//# sourceMappingURL=qualification-level.schema.js.map