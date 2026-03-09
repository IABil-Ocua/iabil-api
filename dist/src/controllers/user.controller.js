"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = loginHandler;
exports.listUsersHandler = listUsersHandler;
exports.fetchUserHandler = fetchUserHandler;
exports.registerUserHandler = registerUserHandler;
exports.fetchAuthenticatedUserHandler = fetchAuthenticatedUserHandler;
const bcrypt_1 = require("bcrypt");
const resend_1 = require("resend");
const db_1 = require("../lib/db");
const user_registration_1 = require("../email/user-registration");
const password_generator_1 = require("../lib/password-generator");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
async function loginHandler(request, reply) {
    try {
        const { email, password } = request.body;
        const user = await db_1.prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
            include: {
                student: true,
                teacher: true,
            },
        });
        if (!user) {
            return reply.status(401).send({ message: "Invalid credentials" });
        }
        const passwordMatch = user.password
            ? await (0, bcrypt_1.compare)(password, user.password)
            : false;
        if (!passwordMatch) {
            return reply.status(401).send({ message: "Invalid credentials" });
        }
        const token = await reply.jwtSign({ id: user.id, email: user.email, role: user.role }, { expiresIn: "1d" });
        return reply.status(200).send({ message: "ok", token, user });
    }
    catch (error) {
        console.error("Error during login:", error);
        return reply.status(500).send({ message: "Internal Server Error", error });
    }
}
async function listUsersHandler(request, reply) {
    try {
        const users = await db_1.prisma.user.findMany({
            include: {
                student: true,
                teacher: true,
            },
        });
        const safeUsers = users.map(({ password, ...rest }) => rest);
        return reply.status(200).send({ message: "ok", users: safeUsers });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return reply.status(500).send({ message: "Internal Server Error", error });
    }
}
async function fetchUserHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "User ID is required" });
        }
        const user = await db_1.prisma.user.findUnique({
            where: { id },
            include: {
                student: true,
                teacher: true,
            },
        });
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }
        const { password, ...rest } = user;
        return reply.status(200).send({ message: "ok", user: rest });
    }
    catch (error) {
        console.error("Error fetching user  :", error);
        return reply.status(500).send({ message: "Internal Server Error", error });
    }
}
async function registerUserHandler(request, reply) {
    try {
        const { email, name, role, avatar } = request.body;
        const existingUser = await db_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return reply
                .status(400)
                .send({ message: "A user with the same email is already registered" });
        }
        const generatedPassword = (0, password_generator_1.passwordGenerator)({
            passwordLength: 8,
            useLowerCase: true,
            useNumbers: true,
            useSymbols: false,
            useUpperCase: true,
        });
        const hashedPassword = await (0, bcrypt_1.hash)(generatedPassword, 10);
        const user = await db_1.prisma.user.create({
            data: {
                email: email.toLowerCase().trim(),
                name,
                password: hashedPassword,
                role: role,
                username: email.toLowerCase().trim(),
                avatar,
            },
        });
        const { data: emailData, error } = await resend.emails.send({
            from: "IAbil <gestao.academica@iabil.co.mz>",
            to: [email],
            subject: "Registration Confirmation on the IABIl Platform",
            react: (0, user_registration_1.UserRegistrationTemplate)({
                name: name,
                email: email.toLowerCase().trim(),
                password: generatedPassword,
                platformName: "IABil",
                loginUrl: "https://iabil.co.mz/login",
                role: role,
            }),
        });
        if (error) {
            console.error("Error sending email:", error);
            return reply
                .status(500)
                .send({ error: "Error sending confirmation email" });
        }
        const { password, ...rest } = user;
        return reply.status(201).send({
            message: "User created successfully",
            user: rest,
            emailId: emailData.id,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return reply.status(500).send({ message: "Internal Server Error", error });
    }
}
async function fetchAuthenticatedUserHandler(request, reply) {
    try {
        const userId = request.user.id;
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                student: true,
                teacher: true,
            },
        });
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }
        return reply.status(200).send({
            message: "ok",
            user,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return reply.status(500).send({ message: "Internal Server Error", error });
    }
}
//# sourceMappingURL=user.controller.js.map