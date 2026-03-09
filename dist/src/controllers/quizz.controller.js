"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuizzesHandler = fetchQuizzesHandler;
exports.fetchQuizzHandler = fetchQuizzHandler;
exports.fetchQuizzByChapterHandler = fetchQuizzByChapterHandler;
exports.createQuizzHandler = createQuizzHandler;
exports.updateQuizzHandler = updateQuizzHandler;
exports.deleteQuizzHandler = deleteQuizzHandler;
const db_1 = require("../lib/db");
async function fetchQuizzesHandler(request, reply) {
    try {
        const quizzes = await db_1.prisma.quizz.findMany({
            relationLoadStrategy: "query",
            include: {
                chapter: true,
                quizzItems: true,
            },
        });
        return reply.status(200).send({ message: "ok", quizzes });
    }
    catch (error) {
        console.log("Error fetching quizzes", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchQuizzHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Quizz ID not provided" });
        }
        const quizz = await db_1.prisma.quizz.findUnique({
            relationLoadStrategy: "query",
            include: {
                chapter: true,
                quizzItems: true,
            },
            where: {
                id: id,
            },
        });
        if (!quizz) {
            return reply.status(404).send({ message: "Quizz not found" });
        }
        return reply.status(200).send({ message: "ok", quizz });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchQuizzByChapterHandler(request, reply) {
    try {
        const { chapterId } = request.params;
        if (!chapterId) {
            return reply.status(400).send({ message: "Chapter ID not provided" });
        }
        const quizz = await db_1.prisma.quizz.findFirst({
            relationLoadStrategy: "query",
            include: {
                chapter: true,
                quizzItems: true,
            },
            where: {
                chapterId,
            },
        });
        if (!quizz) {
            return reply.status(404).send({ message: "Quizz not found" });
        }
        return reply.status(200).send({ message: "ok", quizz });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function createQuizzHandler(request, reply) {
    try {
        const { name, chapterId } = request.body;
        const quizz = await db_1.prisma.quizz.create({
            data: {
                name,
                chapterId,
            },
        });
        return reply
            .status(201)
            .send({ message: "Quizz created successfully", quizz });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function updateQuizzHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Quizz ID not provided" });
        }
        const existingQuizz = await db_1.prisma.quizz.findUnique({
            where: {
                id,
            },
        });
        if (!existingQuizz) {
            return reply.status(404).send({ message: "Quizz not found" });
        }
        const { name, chapterId } = request.body;
        const quizz = await db_1.prisma.quizz.update({
            where: {
                id,
            },
            data: {
                name,
                chapterId,
            },
        });
        return reply
            .status(200)
            .send({ message: "Quizz updated successfully", quizz });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteQuizzHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Quizz ID not provided" });
        }
        const existingQuizz = await db_1.prisma.quizz.findUnique({
            where: {
                id,
            },
        });
        if (!existingQuizz) {
            return reply.status(404).send({ message: "Quizz not found" });
        }
        await db_1.prisma.quizz.delete({
            where: {
                id: id,
            },
        });
        return reply.status(200).send({ message: "Quizz deleted successfully" });
    }
    catch (error) {
        console.log("Error deleting quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=quizz.controller.js.map