"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuizzItemHandler = fetchQuizzItemHandler;
exports.fetchQuizzItemsHandler = fetchQuizzItemsHandler;
exports.createQuizzItemHandler = createQuizzItemHandler;
exports.updateQuizzItemHandler = updateQuizzItemHandler;
exports.deleteQuizzItemHandler = deleteQuizzItemHandler;
exports.checkQuizzItemAnswer = checkQuizzItemAnswer;
const db_1 = require("../lib/db");
async function fetchQuizzItemHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Quizz item ID not provided" });
        }
        const existingQuizzItems = await db_1.prisma.quizzItem.findUnique({
            where: {
                id,
            },
        });
        if (!existingQuizzItems) {
            return reply.status(404).send({ message: "Quizz item not found" });
        }
        const quizzItem = await db_1.prisma.quizzItem.findUnique({
            relationLoadStrategy: "query",
            include: {
                quizz: true,
            },
            where: {
                id: id,
            },
        });
        return reply.status(200).send({ message: "ok", quizzItem });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchQuizzItemsHandler(request, reply) {
    try {
        const { quizzId } = request.params;
        if (!quizzId) {
            return reply.status(400).send({ message: "Quizz ID not provided" });
        }
        const existingQuizz = await db_1.prisma.quizz.findUnique({
            where: {
                id: quizzId,
            },
        });
        if (!existingQuizz) {
            return reply.status(404).send({ message: "Quizz not found." });
        }
        const quizzItems = await db_1.prisma.quizzItem.findMany({
            relationLoadStrategy: "query",
            include: {
                quizz: true,
            },
            where: {
                quizzId,
            },
        });
        return reply.status(200).send({ message: "ok", quizzItems });
    }
    catch (error) {
        console.log("Error fetching quizzes", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function createQuizzItemHandler(request, reply) {
    try {
        const { answer, option1, option2, question, quizzId, option3, option4 } = request.body;
        const quizzItem = await db_1.prisma.quizzItem.create({
            data: {
                answer,
                option1,
                option2,
                question,
                quizzId,
                option3,
                option4,
            },
        });
        return reply
            .status(201)
            .send({ message: "Quizz Item created successfully", quizzItem });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function updateQuizzItemHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Quizz item ID not provided" });
        }
        const existingQuizzItem = await db_1.prisma.quizzItem.findUnique({
            where: {
                id,
            },
        });
        if (!existingQuizzItem) {
            return reply.status(404).send({ message: "Quizz item not found" });
        }
        const { answer, option1, option2, question, quizzId, option3, option4 } = request.body;
        const quizzItem = await db_1.prisma.quizzItem.update({
            where: {
                id,
            },
            data: {
                answer,
                option1,
                option2,
                question,
                quizzId,
                option3,
                option4,
            },
        });
        return reply
            .status(200)
            .send({ message: "Quizz item updated successfully", quizzItem });
    }
    catch (error) {
        console.log("Error fetching quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteQuizzItemHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Quizz item ID not provided" });
        }
        const existingQuizzItem = await db_1.prisma.quizzItem.findUnique({
            where: {
                id,
            },
        });
        if (!existingQuizzItem) {
            return reply.status(404).send({ message: "Quizz item not found" });
        }
        await db_1.prisma.quizzItem.delete({
            where: {
                id: id,
            },
        });
        return reply
            .status(200)
            .send({ message: "Quizz item deleted successfully" });
    }
    catch (error) {
        console.log("Error deleting quizz", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function checkQuizzItemAnswer(request, reply) {
    try {
        const { quizzItemId, studentAnswer } = request.body;
        const quizzItem = await db_1.prisma.quizzItem.findUnique({
            where: {
                id: quizzItemId,
            },
        });
        if (!quizzItem) {
            return reply.status(404).send({ message: "Quizz item not found." });
        }
        if (studentAnswer !== quizzItem.answer) {
            return reply.status(422).send({ message: "Wrong answer." });
        }
        return reply.status(200).send({ message: "Correct answer." });
    }
    catch (error) {
        console.log("Error checking answer", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=quizz-item.controller.js.map