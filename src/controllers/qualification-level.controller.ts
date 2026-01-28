import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import z from "zod";
import {
  createLevelSchema,
  updateLevelSchema,
} from "../schemas/qualification-level.schema";

export async function fetchLevelsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const levels = await prisma.level.findMany({
      relationLoadStrategy: "query",
      include: {
        qualification: true,
        modules: true,
      },
    });

    return reply.status(200).send({ message: "ok", levels });
  } catch (error) {
    console.log("Error fetching levels", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchLevelsByQualificationsHandler(
  request: FastifyRequest<{ Params: { qualificationId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { qualificationId } = request.params;

    if (!qualificationId) {
      return reply
        .status(400)
        .send({ message: "Qualification ID not provided" });
    }

    const levels = await prisma.level.findMany({
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
  } catch (error) {
    console.log("Error fetching levels", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchLevelHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Level ID not provided" });
    }

    const level = await prisma.level.findUnique({
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
  } catch (error) {
    console.log("Error fetching level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function createLevelHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createLevelSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { noticeUrl, qualificationId, title, description } = request.body;

    const level = await prisma.level.create({
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
  } catch (error) {
    console.log("Error fetching level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateLevelHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateLevelSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Level ID not provided" });
    }

    const existingQualification = await prisma.level.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingQualification) {
      return reply.status(404).send({ message: "Level not found" });
    }

    const { noticeUrl, qualificationId, title, description } = request.body;

    const level = await prisma.level.update({
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
  } catch (error) {
    console.log("Error updating level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteLevelHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Level ID not provided" });
    }

    const existingLevel = await prisma.level.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingLevel) {
      return reply.status(404).send({ message: "Level not found" });
    }

    await prisma.level.delete({
      where: {
        id: id,
      },
    });

    return reply.status(200).send({ message: "Level deleted successfully" });
  } catch (error) {
    console.log("Error deleting level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
