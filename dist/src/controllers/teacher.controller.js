"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacherHandler = createTeacherHandler;
exports.getTeachersHandler = getTeachersHandler;
exports.getTeacherByIdHandler = getTeacherByIdHandler;
exports.updateTeacherHandler = updateTeacherHandler;
exports.deleteTeacherHandler = deleteTeacherHandler;
const resend_1 = require("resend");
const bcrypt_1 = require("bcrypt");
const db_1 = require("../lib/db");
const password_generator_1 = require("../lib/password-generator");
const teacher_schema_1 = require("../schemas/teacher.schema");
const user_registration_1 = require("../email/user-registration");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function createTeacherHandler(request, reply) {
    try {
        const { email, name, academicTitle, department, phoneNumber, specialty } = teacher_schema_1.createTeacherSchema.parse(request.body);
        const [existingTeacherByEmail, existingUserByEmail] = await Promise.all([
            db_1.prisma.teacher.findUnique({ where: { email } }),
            db_1.prisma.user.findUnique({ where: { email } }),
        ]);
        if (existingTeacherByEmail) {
            return reply.status(409).send({
                errorCode: "TEACHER_REGISTERED",
                message: "There is already a teacher with this email address..",
            });
        }
        if (existingUserByEmail) {
            return reply.status(409).send({
                errorCode: "USER_REGISTERED",
                message: "A user with this email address already exists.",
            });
        }
        const password = (0, password_generator_1.passwordGenerator)({
            passwordLength: 8,
            useLowerCase: true,
            useNumbers: true,
            useSymbols: false,
            useUpperCase: true,
        });
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const result = await db_1.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    username: email,
                    password: hashedPassword,
                    role: "TEACHER",
                },
            });
            const teacher = await tx.teacher.create({
                data: {
                    name: name,
                    email,
                    phoneNumber: phoneNumber ?? null,
                    academicTitle: academicTitle ?? null,
                    specialty: specialty ?? null,
                    department: department ?? null,
                    userId: user.id,
                },
            });
            const { data: emailData, error } = await resend.emails.send({
                from: "IAbil <gestao.academica@iabil.co.mz>",
                to: [email],
                subject: "Registration Confirmation on the IABIl Platform",
                react: (0, user_registration_1.UserRegistrationTemplate)({
                    name: name,
                    email: email.toLowerCase().trim(),
                    password: password,
                    platformName: "IABil",
                    loginUrl: "https://iabil.co.mz/login",
                    role: "TEACHER",
                }),
            });
            if (error) {
                return reply.status(500).send({
                    errorCode: "EMAIL_SENDING_ERROR",
                    message: "An error ocurred sending email",
                });
            }
            return { teacher, user, emailId: emailData.id };
        });
        return reply.status(201).send({
            message: "Teacher created successfully.",
            teacher: result.teacher,
            emailId: result.emailId,
        });
    }
    catch (error) {
        console.error(error);
        return reply
            .status(500)
            .send({ errorCode: "SERVER_ERROR", message: "Internal server error" });
    }
}
async function getTeachersHandler(_request, reply) {
    try {
        const teachers = await db_1.prisma.teacher.findMany({
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });
        return reply.send({ message: "ok", teachers });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
    }
}
async function getTeacherByIdHandler(request, reply) {
    try {
        const { id } = request.params;
        const teacher = await db_1.prisma.teacher.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!teacher) {
            return reply.status(404).send({ message: "Teacher not found" });
        }
        return reply.send({ message: "ok", teacher });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
    }
}
async function updateTeacherHandler(request, reply) {
    try {
        const { id } = request.params;
        const { academicTitle, department, email, name, phoneNumber, specialty } = teacher_schema_1.updateTeacherSchema.parse(request.body);
        const existing = await db_1.prisma.teacher.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!existing) {
            return reply.status(404).send({ message: "Teacher not found" });
        }
        const userWithEmail = await db_1.prisma.user.findUnique({
            where: { email },
        });
        if (userWithEmail && userWithEmail.id !== existing.userId) {
            return reply.status(400).send({
                message: "This email address is already in use by another user..",
            });
        }
        const teacherWithEmail = await db_1.prisma.teacher.findUnique({
            where: { email },
        });
        if (teacherWithEmail && teacherWithEmail.id !== id) {
            return reply.status(400).send({
                message: "This email address is already in use by another professor.",
            });
        }
        const updated = await db_1.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: existing.userId },
                data: {
                    name,
                    email,
                    username: email,
                },
            });
            const teacher = await tx.teacher.update({
                where: { id },
                data: {
                    name,
                    email,
                    phoneNumber,
                    academicTitle,
                    specialty,
                    department,
                },
                include: { user: true },
            });
            return teacher;
        });
        return reply.send({
            message: "Professor atualizado com sucesso.",
            teacher: updated,
        });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
    }
}
async function deleteTeacherHandler(request, reply) {
    try {
        const { id } = request.params;
        const existing = await db_1.prisma.teacher.findUnique({ where: { id } });
        if (!existing) {
            return reply.status(404).send({ message: "Teacher not found." });
        }
        await db_1.prisma.teacher.delete({ where: { id } });
        return reply.send({ message: "Teacher deleted successfully." });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
    }
}
//# sourceMappingURL=teacher.controller.js.map