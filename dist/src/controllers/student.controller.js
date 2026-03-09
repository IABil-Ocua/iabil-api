"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentHandler = createStudentHandler;
exports.fetchStudentsHandler = fetchStudentsHandler;
exports.fetchStudentByIdHandler = fetchStudentByIdHandler;
exports.exportExcelHandler = exportExcelHandler;
exports.updateStudentHandler = updateStudentHandler;
exports.deleteStudentHandler = deleteStudentHandler;
const exceljs_1 = __importDefault(require("exceljs"));
const bcrypt_1 = require("bcrypt");
const db_1 = require("../lib/db");
const password_generator_1 = require("../lib/password-generator");
const resend_1 = require("resend");
const user_registration_1 = require("../email/user-registration");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function createStudentHandler(request, reply) {
    try {
        const { qualificationId, email, name, code, status, approvalStatus, currentLevelId, ...rest } = request.body;
        const existingStudentCode = await db_1.prisma.student.findFirst({
            where: {
                code,
            },
        });
        if (existingStudentCode) {
            return reply.status(409).send({
                errorCode: "STUDENT_CODE_ALREADY_REGISTERED",
                message: "Student with same code already registered",
            });
        }
        const existingStudentEmail = await db_1.prisma.student.findFirst({
            where: {
                email,
            },
        });
        if (existingStudentEmail) {
            return reply.status(409).send({
                errorCode: "STUDENT_EMAIL_ALREADY_REGISTERED",
                message: "Student with same email already registered",
            });
        }
        const existingUser = await db_1.prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });
        if (existingUser) {
            return reply.status(409).send({
                errorCode: "USER_EMAIL_REGISTERED",
                message: "Email already registered as user",
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
                    email: email.toLowerCase().trim(),
                    name,
                    password: hashedPassword,
                    username: email.toLowerCase().trim(),
                    role: "STUDENT",
                },
            });
            const student = await tx.student.create({
                data: {
                    ...rest,
                    name,
                    code,
                    email: email.toLowerCase().trim(),
                    qualificationId,
                    userId: user.id,
                    approvalStatus,
                    status,
                    currentLevelId,
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
                    role: "STUDENT",
                }),
            });
            if (error) {
                return reply.status(500).send({
                    errorCode: "EMAIL_SENDING_ERROR",
                    message: "An error ocurred sending email",
                });
            }
            return { user, student, emailId: emailData?.id };
        });
        return reply.status(201).send({
            message: "Student created successfully",
            student: result.student,
            emailId: result.emailId,
        });
    }
    catch (error) {
        console.error("Error creating student:", error);
        return reply
            .status(500)
            .send({ errorCode: "SERVER_ERROR", message: "Internal server error" });
    }
}
async function fetchStudentsHandler(request, reply) {
    try {
        const students = await db_1.prisma.student.findMany({
            relationLoadStrategy: "query",
            orderBy: {
                createdAt: "asc",
            },
        });
        return reply.status(200).send({ message: "ok", students });
    }
    catch (error) {
        console.error("Error fetching students:", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchStudentByIdHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Student ID not provided" });
        }
        const student = await db_1.prisma.student.findUnique({
            relationLoadStrategy: "query",
            where: {
                id,
            },
        });
        if (!student) {
            return reply.status(404).send({ message: "Student not found." });
        }
        return reply.status(200).send({ message: "ok", student });
    }
    catch (error) {
        console.error("Error fetching students:", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function exportExcelHandler(request, reply) {
    try {
        const students = await db_1.prisma.student.findMany();
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Students");
        worksheet.columns = [
            { header: "ID", key: "id", width: 35 },
            { header: "Name", key: "name", width: 25 },
            { header: "Code", key: "code", width: 15 },
            { header: "Gender", key: "gender", width: 10 },
            { header: "Email", key: "email", width: 25 },
        ];
        students.forEach((student) => worksheet.addRow(student));
        const buffer = await workbook.xlsx.writeBuffer();
        reply
            .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            .header("Content-Disposition", "attachment; filename=students.xlsx")
            .status(200)
            .send(Buffer.from(buffer));
    }
    catch (error) {
        console.log(error);
        return reply
            .status(500)
            .send({ message: "An internal server error occurred", error });
    }
}
async function updateStudentHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Student ID not provided" });
        }
        const existingStudent = await db_1.prisma.student.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            return reply.status(404).send({ message: "Student not found." });
        }
        const { birthDate, email, gender, name, code, financier, specialty } = request.body;
        const student = await db_1.prisma.$transaction(async (tx) => {
            const student = await tx.student.update({
                where: { id },
                data: {
                    birthDate,
                    email,
                    gender,
                    name,
                    code,
                    financier,
                    specialty,
                },
            });
            return student;
        }, { timeout: 20000 });
        return reply
            .status(200)
            .send({ message: "Student updated successfully", student });
    }
    catch (error) {
        console.log("Error update student:", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteStudentHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Student ID not provided" });
        }
        const student = await db_1.prisma.student.findUnique({
            where: {
                id,
            },
        });
        if (!student) {
            return reply.status(404).send({ message: "Student not found." });
        }
        await db_1.prisma.$transaction(async (tx) => {
            await tx.student.delete({
                where: {
                    id,
                },
            });
        }, { timeout: 20000 });
        return reply.status(200).send({ message: "Student deleted successfully" });
    }
    catch (error) {
        console.log("Error deleting student:", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=student.controller.js.map