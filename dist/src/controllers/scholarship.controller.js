"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScholarshipHandler = createScholarshipHandler;
exports.getScholarshipsHandler = getScholarshipsHandler;
exports.getScholarshipByIdHandler = getScholarshipByIdHandler;
exports.updateScholarshipHandler = updateScholarshipHandler;
exports.deleteScholarshipHandler = deleteScholarshipHandler;
const db_1 = require("../lib/db");
async function createScholarshipHandler(request, reply) {
    try {
        const { name, status, type, amount, description, endDate, sponsor, startDate, } = request.body;
        const scholarship = await db_1.prisma.scholarship.create({
            data: {
                name,
                status,
                type,
                amount,
                description,
                endDate,
                sponsor,
                startDate,
            },
        });
        return reply.code(201).send({
            message: "Scholarship created successfully!",
            scholarship,
        });
    }
    catch (error) {
        console.error(error);
        return reply.code(500).send({ message: "Error creating scholarship" });
    }
}
async function getScholarshipsHandler(request, reply) {
    try {
        const scholarships = await db_1.prisma.scholarship.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return reply.status(200).send({ message: "ok", scholarships });
    }
    catch (error) {
        console.error(error);
        return reply.code(500).send({ message: "Error fetching scholarships" });
    }
}
async function getScholarshipByIdHandler(request, reply) {
    const { id } = request.params;
    try {
        const scholarships = await db_1.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!scholarships) {
            return reply.status(404).send({ message: "Scholarship not found" });
        }
        return reply.status(200).send({ message: "ok", scholarship: scholarships });
    }
    catch (error) {
        console.error(error);
        return reply.code(500).send({ message: "Error fetching scholarship" });
    }
}
async function updateScholarshipHandler(request, reply) {
    const { id } = request.params;
    const { name, status, type, amount, description, endDate, sponsor, startDate, } = request.body;
    try {
        const existingScholarship = await db_1.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!existingScholarship) {
            return reply.status(404).send({ message: "Scholarship not found" });
        }
        const scholarship = await db_1.prisma.scholarship.update({
            data: {
                name,
                status,
                type,
                amount,
                description,
                endDate,
                sponsor,
                startDate,
            },
            where: {
                id,
            },
        });
        return reply
            .status(200)
            .send({ message: "Scholarship updated successfully", scholarship });
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send({ message: "Error updating scholarship" });
    }
}
async function deleteScholarshipHandler(request, reply) {
    try {
        const { id } = request.params;
        const existingScholarship = await db_1.prisma.scholarship.findUnique({
            where: { id },
        });
        if (!existingScholarship) {
            return reply.status(404).send({ message: "Scholarship not found" });
        }
        await db_1.prisma.scholarship.delete({
            where: {
                id,
            },
        });
        return reply
            .status(200)
            .send({ message: "Scholarship deleted successfully" });
    }
    catch (error) {
        return reply.code(500).send({ message: "Error deleting scholarship" });
    }
}
//# sourceMappingURL=scholarship.controller.js.map