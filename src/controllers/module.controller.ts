import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import z from "zod";
import {
  createModuleSchema,
  updateModuleSchema,
} from "../schemas/module.schema";

export async function fetchModulesHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const modules = await prisma.module.findMany({
      relationLoadStrategy: "query",
      include: {
        chapters: true,
        level: true,
      },
    });

    return reply.status(200).send({ message: "ok", modules });
  } catch (error) {
    console.log("Error fetching modules", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchModuleHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Module ID not provided" });
    }

    const module = await prisma.module.findUnique({
      relationLoadStrategy: "query",
      include: {
        chapters: true,
        level: true,
      },
      where: {
        id,
      },
    });

    if (!module) {
      return reply.status(404).send({ message: "Module not found" });
    }

    return reply.status(200).send({ message: "ok", module });
  } catch (error) {
    console.log("Error fetching module", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function createModuleHandler(
  request: FastifyRequest<{
    Body: z.infer<typeof createModuleSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const { title, description, levelId, workload } = request.body;

    const module = await prisma.module.create({
      data: {
        title,
        description,
        levelId,
        workload,
      },
    });

    return reply
      .status(201)
      .send({ message: "Module created succsessfylly", module });
  } catch (error) {
    console.log("Error creating module", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateModuleHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateModuleSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { description, levelId, title, workload } = request.body;

    if (!id) {
      return reply.status(400).send({ message: "Module ID not provided" });
    }

    const module = await prisma.module.findUnique({
      where: {
        id,
      },
    });

    if (!module) {
      return reply.status(404).send({ message: "Module not found" });
    }

    const updatedModule = await prisma.module.update({
      data: {
        description,
        levelId,
        title,
        workload,
      },
      where: {
        id,
      },
    });

    return reply.status(200).send({
      message: "Module updated successfully",
      module: updatedModule,
    });
  } catch (error) {
    console.log("Error updating module", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteModuleHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    if (!id) {
      return reply.status(400).send({ message: "Module ID not provided" });
    }

    const module = await prisma.module.findUnique({
      where: {
        id,
      },
    });

    if (!module) {
      return reply.status(404).send({ message: "Module not found" });
    }

    await prisma.module.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send({ message: "Module deleted successfylly" });
  } catch (error) {
    console.log("Error deleting module", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
