"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = exports.userWithRelationsSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const student_schema_1 = require("./student.schema");
const teacher_schema_1 = require("./teacher.schema");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.cuid(),
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    avatar: zod_1.z.string().nullable(),
    role: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.userWithRelationsSchema = zod_1.z.lazy(() => exports.userSchema.extend({
    student: student_schema_1.studentSchema.nullable(),
    teacher: teacher_schema_1.teacherSchema.nullable(),
}));
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required."),
    email: zod_1.z.email("Invalid email format.").min(1, "Email is required."),
    avatar: zod_1.z.string().optional(),
    role: zod_1.z
        .enum(["TEACHER", "ADMIN", "STUDENT", "SUPER_ADMIN"])
        .refine((val) => ["TEACHER", "ADMIN", "STUDENT", "SUPER_ADMIN"].includes(val), {
        message: "Role must be one of the predefined values.",
    }),
});
exports.updateUserSchema = exports.createUserSchema.partial();
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email format").min(1, "Email is required."),
    password: zod_1.z.string().min(1, "Password is required."),
});
//# sourceMappingURL=user.schema.js.map