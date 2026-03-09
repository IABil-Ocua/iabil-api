"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQualificationsHandler = fetchQualificationsHandler;
exports.fetchQualificationHandler = fetchQualificationHandler;
exports.createQualificationHandler = createQualificationHandler;
exports.updateQualificationHandler = updateQualificationHandler;
exports.deleteQualificationHandler = deleteQualificationHandler;
const db_1 = require("../lib/db");
async function fetchQualificationsHandler(request, reply) {
    try {
        const qualifications = await db_1.prisma.qualification.findMany({
            relationLoadStrategy: "query",
            include: {
                levels: true,
            },
        });
        return reply.status(200).send({ message: "ok", qualifications });
    }
    catch (error) {
        console.log("Error fetching qualifications", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchQualificationHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply
                .status(400)
                .send({ message: "Qualification ID not provided" });
        }
        const qualification = await db_1.prisma.qualification.findUnique({
            relationLoadStrategy: "query",
            include: {
                levels: true,
            },
            where: {
                id: id,
            },
        });
        if (!qualification) {
            return reply.status(404).send({ message: "Qualification not found" });
        }
        return reply.status(200).send({ message: "ok", qualification });
    }
    catch (error) {
        console.log("Error fetching qualification", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function createQualificationHandler(request, reply) {
    try {
        const { credits, workload, knowledgeAreas, name, bannerUrl, description } = request.body;
        const qualification = await db_1.prisma.qualification.create({
            data: {
                credits,
                workload,
                knowledgeAreas,
                name,
                bannerUrl,
                description,
            },
        });
        return reply
            .status(201)
            .send({ message: "Qualification created successfully", qualification });
    }
    catch (error) {
        console.log("Error fetching qualification", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function updateQualificationHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply
                .status(400)
                .send({ message: "Qualification ID not provided" });
        }
        const existingQualification = await db_1.prisma.qualification.findUnique({
            where: {
                id: id,
            },
        });
        if (!existingQualification) {
            return reply.status(404).send({ message: "Qualification not found" });
        }
        const { credits, workload, knowledgeAreas, name, bannerUrl, description } = request.body;
        const qualification = await db_1.prisma.qualification.update({
            data: {
                credits,
                workload,
                knowledgeAreas,
                name,
                bannerUrl,
                description,
            },
            where: {
                id: id,
            },
        });
        return reply
            .status(200)
            .send({ message: "Qualification updated successfully", qualification });
    }
    catch (error) {
        console.log("Error updating qualification", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteQualificationHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply
                .status(400)
                .send({ message: "Qualification ID not provided" });
        }
        const existingqualification = await db_1.prisma.qualification.findUnique({
            where: {
                id: id,
            },
        });
        if (!existingqualification) {
            return reply.status(404).send({ message: "Qualification not found" });
        }
        await db_1.prisma.qualification.delete({
            where: {
                id: id,
            },
        });
        return reply
            .status(200)
            .send({ message: "Qualification deleted successfully" });
    }
    catch (error) {
        console.log("Error deleting qualification", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=qualification.controller.js.map