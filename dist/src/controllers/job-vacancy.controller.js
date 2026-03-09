"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobVacancyHandler = createJobVacancyHandler;
exports.getJobVacanciesHandler = getJobVacanciesHandler;
exports.getJobVacancyByIdHandler = getJobVacancyByIdHandler;
exports.updateJobVacancyHandler = updateJobVacancyHandler;
exports.deleteJobVacancyHandler = deleteJobVacancyHandler;
const db_1 = require("../lib/db");
async function createJobVacancyHandler(req, reply) {
    try {
        const { companyName, location, title, url } = req.body;
        const jobVacancy = await db_1.prisma.jobVacancy.create({
            data: {
                url,
                companyName,
                location,
                title,
            },
        });
        return reply
            .status(201)
            .send({ message: "Job vacancy created successfully", jobVacancy });
    }
    catch (error) {
        console.error("Error creating job vacancy:", error);
        return reply
            .status(400)
            .send({ message: "Internal server error occurred" });
    }
}
async function getJobVacanciesHandler(request, reply) {
    try {
        const jobVacancies = await db_1.prisma.jobVacancy.findMany();
        return reply.status(200).send({ message: "ok", jobVacancies });
    }
    catch (error) {
        console.error("Error listing job vacancies:", error);
        return reply
            .status(500)
            .send({ message: "Failed to retrieve job vacancies" });
    }
}
async function getJobVacancyByIdHandler(req, reply) {
    try {
        const { id } = req.params;
        const jobVacancy = await db_1.prisma.jobVacancy.findUnique({
            where: { id },
        });
        if (!jobVacancy)
            return reply.status(404).send({ message: "Job vacancy not found" });
        return reply.status(200).send({ message: "ok", jobVacancy });
    }
    catch (error) {
        console.error("Error fetching job vacancy:", error);
        return reply.status(500).send({ message: "Failed to fetch job vacancy" });
    }
}
async function updateJobVacancyHandler(req, reply) {
    try {
        const { id } = req.params;
        const { companyName, location, title, url } = req.body;
        const existing = await db_1.prisma.jobVacancy.findUnique({ where: { id } });
        if (!existing)
            return reply.status(404).send({ message: "Job vacancy not found" });
        const jobVacancy = await db_1.prisma.jobVacancy.update({
            where: { id },
            data: {
                url,
                companyName,
                location,
                title,
            },
        });
        return reply
            .status(200)
            .send({ message: "Job vacancy updated successfully", jobVacancy });
    }
    catch (error) {
        console.error("Error updating job vacancy:", error);
        return reply
            .status(400)
            .send({ message: "Falha ao actualizar vaga de emprego" });
    }
}
async function deleteJobVacancyHandler(req, reply) {
    try {
        const { id } = req.params;
        const existing = await db_1.prisma.jobVacancy.findUnique({ where: { id } });
        if (!existing)
            return reply.status(404).send({ error: "Job vacancy not found" });
        await db_1.prisma.jobVacancy.delete({ where: { id } });
        return reply.send({ message: "Job vacancy deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting job vacancy:", error);
        return reply
            .status(500)
            .send({ message: "Falha ao eliminar vaga de emprego" });
    }
}
//# sourceMappingURL=job-vacancy.controller.js.map