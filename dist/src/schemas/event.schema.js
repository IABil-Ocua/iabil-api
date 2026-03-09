"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = exports.eventWithRelationsSchema = exports.eventSchema = exports.eventTypeEnum = void 0;
const zod_1 = require("zod");
const user_schema_1 = require("./user.schema");
exports.eventTypeEnum = zod_1.z.enum(["TRAINING", "SEMINAR", "CONFERENCE"]);
exports.eventSchema = zod_1.z.object({
    id: zod_1.z.cuid(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().nullable(),
    location: zod_1.z.string().nullable(),
    type: exports.eventTypeEnum,
    imageUrl: zod_1.z.string().url().nullable(),
    organizer: zod_1.z.string().nullable(),
    isPublished: zod_1.z.boolean().nullable(),
    createdById: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.eventWithRelationsSchema = zod_1.z.lazy(() => exports.eventSchema.extend({
    createdBy: user_schema_1.userSchema,
}));
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters.")
        .max(255, "Title is too long."),
    description: zod_1.z
        .string()
        .max(2000, "Description is too long.")
        .optional()
        .nullable(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().optional(),
    location: zod_1.z.string().optional(),
    type: exports.eventTypeEnum,
    imageUrl: zod_1.z.string().url("Invalid URL").optional(),
    organizer: zod_1.z.string().optional(),
    isPublished: zod_1.z.boolean().optional().default(false),
    createdById: zod_1.z.string().min(1, "Creator ID is required."),
});
exports.updateEventSchema = exports.createEventSchema.partial();
//# sourceMappingURL=event.schema.js.map