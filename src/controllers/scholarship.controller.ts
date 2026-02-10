import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import {
  createScholarshipSchema,
  updateScholarshipSchema,
} from "../schemas/scholarship.schema";
import { prisma } from "../lib/db";

export async function createScholarshipHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createScholarshipSchema> }>,
  reply: FastifyReply,
) {
  try {
    const {
      name,
      status,
      type,
      amount,
      description,
      endDate,
      sponsor,
      startDate,
    } = request.body;

    const scholarship = await prisma.scholarship.create({
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
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Error creating scholarship" });
  }
}

export async function getScholarshipsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return reply.status(200).send({ message: "ok", scholarships });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Error fetching scholarships" });
  }
}

export async function getScholarshipByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  try {
    const scholarships = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!scholarships) {
      return reply.status(404).send({ message: "Scholarship not found" });
    }

    return reply.status(200).send({ message: "ok", scholarship: scholarships });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Error fetching scholarship" });
  }
}

export async function updateScholarshipHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateScholarshipSchema>;
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const {
    name,
    status,
    type,
    amount,
    description,
    endDate,
    sponsor,
    startDate,
  } = request.body;

  try {
    const existingScholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!existingScholarship) {
      return reply.status(404).send({ message: "Scholarship not found" });
    }

    const scholarship = await prisma.scholarship.update({
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
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "Error updating scholarship" });
  }
}

export async function deleteScholarshipHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const existingScholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!existingScholarship) {
      return reply.status(404).send({ message: "Scholarship not found" });
    }

    await prisma.scholarship.delete({
      where: {
        id,
      },
    });

    return reply
      .status(200)
      .send({ message: "Scholarship deleted successfully" });
  } catch (error) {
    return reply.code(500).send({ message: "Error deleting scholarship" });
  }
}
