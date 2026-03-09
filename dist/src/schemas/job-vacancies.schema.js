"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobVacancySchema = exports.createJobVacancySchema = exports.jobVacancySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.jobVacancySchema = zod_1.default.object({
    id: zod_1.default.cuid(),
    title: zod_1.default.string(),
    companyName: zod_1.default.string(),
    url: zod_1.default.string(),
    location: zod_1.default.string(),
    createdAt: zod_1.default.coerce.date(),
    updatedAt: zod_1.default.coerce.date(),
});
exports.createJobVacancySchema = zod_1.default.object({
    title: zod_1.default.string().min(3, "Title is required"),
    companyName: zod_1.default.string().min(2, "Company name is required"),
    url: zod_1.default.string(),
    location: zod_1.default.string().min(5, "Location is required"),
});
exports.updateJobVacancySchema = exports.createJobVacancySchema.partial();
//# sourceMappingURL=job-vacancies.schema.js.map