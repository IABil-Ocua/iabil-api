import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import z from "zod";
import {
  createChapterSchema,
  updateChapterSchema,
} from "../schemas/chapter.schema";

export async function fetchChaptersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const chapters = await prisma.chapter.findMany({
      relationLoadStrategy: "query",
      include: {
        level: true,
        quizzes: true,
      },
    });

    return reply.status(200).send({ message: "ok", chapters });
  } catch (error) {
    console.log("Error fetching chapters", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchChapterHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "chapter ID not provided" });
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id,
      },
    });

    if (!chapter) {
      return reply.status(404).send({ message: "Chapter not found" });
    }

    return reply.status(200).send({ message: "ok", chapter });
  } catch (error) {
    console.log("Error fetching chapter", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function createChapterHandler(
  request: FastifyRequest<{
    Body: z.infer<typeof createChapterSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const {
      content,
      levelId,
      supplementaryMaterialUrl1,
      supplementaryMaterialUrl2,
    } = request.body;

    const chapter = await prisma.chapter.create({
      data: {
        content,
        levelId,
        supplementaryMaterialUrl1,
        supplementaryMaterialUrl2,
      },
    });

    return reply
      .status(201)
      .send({ message: "Chapter created succsessfylly", chapter });
  } catch (error) {
    console.log("Error creating chapter", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateChaperHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateChapterSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const {
      content,
      levelId,
      supplementaryMaterialUrl1,
      supplementaryMaterialUrl2,
    } = request.body;

    if (!id) {
      return reply.status(400).send({ message: "Chapter ID not provided" });
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id,
      },
    });

    if (!chapter) {
      return reply.status(404).send({ message: "Chapter not found" });
    }

    const updatedChapter = await prisma.chapter.update({
      data: {
        content,
        levelId,
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
  } catch (error) {
    console.log("Error updating chapter", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteChapterHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    if (!id) {
      return reply.status(400).send({ message: "Chapter ID not provided" });
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id,
      },
    });

    if (!chapter) {
      return reply.status(404).send({ message: "Chapter not found" });
    }

    await prisma.chapter.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send({ message: "Chapter deleted successfylly" });
  } catch (error) {
    console.log("Error deleting chapter", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
