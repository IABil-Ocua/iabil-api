"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLevelsHandler = fetchLevelsHandler;
exports.fetchLevelsByQualificationsHandler = fetchLevelsByQualificationsHandler;
exports.fetchLevelHandler = fetchLevelHandler;
exports.createLevelHandler = createLevelHandler;
exports.updateLevelHandler = updateLevelHandler;
exports.deleteLevelHandler = deleteLevelHandler;
const db_1 = require("../lib/db");
async function fetchLevelsHandler(request, reply) {
    try {
        const levels = await db_1.prisma.level.findMany({
            relationLoadStrategy: "query",
            include: {
                qualification: true,
                modules: true,
            },
        });
        return reply.status(200).send({ message: "ok", levels });
    }
    catch (error) {
        console.log("Error fetching levels", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchLevelsByQualificationsHandler(request, reply) {
    try {
        const { qualificationId } = request.params;
        if (!qualificationId) {
            return reply
                .status(400)
                .send({ message: "Qualification ID not provided" });
        }
        const levels = await db_1.prisma.level.findMany({
            relationLoadStrategy: "query",
            include: {
                qualification: true,
                modules: true,
            },
            where: {
                qualificationId,
            },
        });
        return reply.status(200).send({ message: "ok", levels });
    }
    catch (error) {
        console.log("Error fetching levels", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchLevelHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Level ID not provided" });
        }
        const level = await db_1.prisma.level.findUnique({
            relationLoadStrategy: "query",
            include: {
                qualification: true,
                modules: true,
            },
            where: {
                id: id,
            },
        });
        if (!level) {
            return reply.status(404).send({ message: "Level not found" });
        }
        return reply.status(200).send({ message: "ok", level });
    }
    catch (error) {
        console.log("Error fetching level", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function createLevelHandler(request, reply) {
    try {
        const { noticeUrl, qualificationId, title, description } = request.body;
        const level = await db_1.prisma.level.create({
            data: {
                noticeUrl,
                qualificationId,
                title,
                description,
            },
        });
        return reply
            .status(201)
            .send({ message: "Level created successfully", level });
    }
    catch (error) {
        console.log("Error fetching level", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function updateLevelHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Level ID not provided" });
        }
        const existingQualification = await db_1.prisma.level.findUnique({
            where: {
                id: id,
            },
        });
        if (!existingQualification) {
            return reply.status(404).send({ message: "Level not found" });
        }
        const { noticeUrl, qualificationId, title, description } = request.body;
        const level = await db_1.prisma.level.update({
            data: {
                noticeUrl,
                qualificationId,
                title,
                description,
            },
            where: {
                id: id,
            },
        });
        return reply
            .status(200)
            .send({ message: "Level updated successfully", level });
    }
    catch (error) {
        console.log("Error updating level", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteLevelHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Level ID not provided" });
        }
        const existingLevel = await db_1.prisma.level.findUnique({
            where: {
                id: id,
            },
        });
        if (!existingLevel) {
            return reply.status(404).send({ message: "Level not found" });
        }
        await db_1.prisma.level.delete({
            where: {
                id: id,
            },
        });
        return reply.status(200).send({ message: "Level deleted successfully" });
    }
    catch (error) {
        console.log("Error deleting level", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=level.controller.js.map