import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import {
  createJobVacancySchema,
  updateJobVacancySchema,
} from "../schemas/job-vacancies.schema";
import z from "zod";

export async function createJobVacancyHandler(
  req: FastifyRequest<{ Body: z.infer<typeof createJobVacancySchema> }>,
  reply: FastifyReply
) {
  try {
    const { companyName, location, title, url } = req.body;

    const jobVacancy = await prisma.jobVacancy.create({
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
  } catch (error) {
    console.error("Error creating job vacancy:", error);
    return reply
      .status(400)
      .send({ message: "Internal server error occurred" });
  }
}

export async function getJobVacanciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const jobVacancies = await prisma.jobVacancy.findMany();

    return reply.status(200).send({ message: "ok", jobVacancies });
  } catch (error) {
    console.error("Error listing job vacancies:", error);
    return reply.status(500).send({ message: "Failed to retrieve job vacancies" });
  }
}

export async function getJobVacancyByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const jobVacancy = await prisma.jobVacancy.findUnique({
      where: { id },
    });

    if (!jobVacancy)
      return reply
        .status(404)
        .send({ message: "Job vacancy not found" });

    return reply.status(200).send({ message: "ok", jobVacancy });
  } catch (error) {
    console.error("Error fetching job vacancy:", error);
    return reply.status(500).send({ message: "Failed to fetch job vacancy" });
  }
}

export async function updateJobVacancyHandler(
  req: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateJobVacancySchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const { companyName, location, title, url } = req.body;

    const existing = await prisma.jobVacancy.findUnique({ where: { id } });

    if (!existing)
      return reply
        .status(404)
        .send({ message: "Job vacancy not found" });

    const jobVacancy = await prisma.jobVacancy.update({
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
  } catch (error) {
    console.error("Error updating job vacancy:", error);
    return reply
      .status(400)
      .send({ message: "Falha ao actualizar vaga de emprego" });
  }
}

export async function deleteJobVacancyHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const existing = await prisma.jobVacancy.findUnique({ where: { id } });

    if (!existing)
      return reply
        .status(404)
        .send({ error: "Job vacancy not found" });

    await prisma.jobVacancy.delete({ where: { id } });

    return reply.send({ message: "Job vacancy deleted successfully" });
  } catch (error) {
    console.error("Error deleting job vacancy:", error);
    return reply
      .status(500)
      .send({ message: "Falha ao eliminar vaga de emprego" });
  }
}
