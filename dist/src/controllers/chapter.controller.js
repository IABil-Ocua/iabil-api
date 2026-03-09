"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChaptersHandler = fetchChaptersHandler;
exports.fetchChapterHandler = fetchChapterHandler;
exports.fetchChaptersByModuleHandler = fetchChaptersByModuleHandler;
exports.createChapterHandler = createChapterHandler;
exports.updateChapterHandler = updateChapterHandler;
exports.deleteChapterHandler = deleteChapterHandler;
const db_1 = require("../lib/db");
async function fetchChaptersHandler(request, reply) {
    try {
        const chapters = await db_1.prisma.chapter.findMany({
            relationLoadStrategy: "query",
            include: {
                module: true,
                quizzes: {
                    include: {
                        chapter: true,
                        quizzItems: true,
                    },
                },
            },
        });
        return reply.status(200).send({ message: "ok", chapters });
    }
    catch (error) {
        console.log("Error fetching chapters", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchChapterHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "chapter ID not provided" });
        }
        const chapter = await db_1.prisma.chapter.findUnique({
            relationLoadStrategy: "query",
            include: {
                module: true,
                quizzes: {
                    include: {
                        chapter: true,
                        quizzItems: true,
                    },
                },
            },
            where: {
                id,
            },
        });
        if (!chapter) {
            return reply.status(404).send({ message: "Chapter not found" });
        }
        return reply.status(200).send({ message: "ok", chapter });
    }
    catch (error) {
        console.log("Error fetching chapter", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchChaptersByModuleHandler(request, reply) {
    try {
        const { moduleId } = request.params;
        if (!moduleId) {
            return reply.status(400).send({ message: "Level ID not provided" });
        }
        const chapters = await db_1.prisma.chapter.findMany({
            relationLoadStrategy: "query",
            include: {
                module: true,
                quizzes: {
                    include: {
                        chapter: true,
                        quizzItems: true,
                    },
                },
            },
            where: {
                moduleId,
            },
        });
        console.log(chapters);
        return reply.status(200).send({ message: "ok", chapters });
    }
    catch (error) {
        console.log("Error fetching chapters", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function createChapterHandler(request, reply) {
    try {
        const { title, content, moduleId, supplementaryMaterialUrl1, supplementaryMaterialUrl2, } = request.body;
        const chapter = await db_1.prisma.chapter.create({
            data: {
                title,
                content,
                moduleId,
                supplementaryMaterialUrl1,
                supplementaryMaterialUrl2,
            },
        });
        return reply
            .status(201)
            .send({ message: "Chapter created succsessfylly", chapter });
    }
    catch (error) {
        console.log("Error creating chapter", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function updateChapterHandler(request, reply) {
    try {
        const { id } = request.params;
        const { content, moduleId, supplementaryMaterialUrl1, supplementaryMaterialUrl2, } = request.body;
        if (!id) {
            return reply.status(400).send({ message: "Chapter ID not provided" });
        }
        const chapter = await db_1.prisma.chapter.findUnique({
            where: {
                id,
            },
        });
        if (!chapter) {
            return reply.status(404).send({ message: "Chapter not found" });
        }
        const updatedChapter = await db_1.prisma.chapter.update({
            data: {
                content,
                moduleId,
                supplementaryMaterialUrl1,
                supplementaryMaterialUrl2,
            },
            where: {
                id,
            },
        });
        return reply.status(200).send({
            message: "Chapter updated successfully",
            chapter: updatedChapter,
        });
    }
    catch (error) {
        console.log("Error updating chapter", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteChapterHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Chapter ID not provided" });
        }
        const chapter = await db_1.prisma.chapter.findUnique({
            where: {
                id,
            },
        });
        if (!chapter) {
            return reply.status(404).send({ message: "Chapter not found" });
        }
        await db_1.prisma.chapter.delete({
            where: {
                id,
            },
        });
        return reply.status(200).send({ message: "Chapter deleted successfylly" });
    }
    catch (error) {
        console.log("Error deleting chapter", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=chapter.controller.js.map