import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import { createEventSchema, updateEventSchema } from "../schemas/event.schema";
import z from "zod";

export async function createEventHandler(
  req: FastifyRequest<{ Body: z.infer<typeof createEventSchema> }>,
  reply: FastifyReply
) {
  try {
    const {
      createdById,
      isPublished,
      startDate,
      title,
      type,
      description,
      endDate,
      imageUrl,
      location,
      organizer,
    } = req.body;

    const event = await prisma.event.create({
      data: {
        createdById,
        isPublished,
        startDate: new Date(startDate),
        title,
        type,
        description,
        endDate: endDate ? new Date(endDate) : null,
        imageUrl,
        location,
        organizer,
      },
    });
    return reply
      .status(201)
      .send({ message: "Event created successfuly", event });
  } catch (error) {
    console.error("Error creating event:", error);
    return reply.status(400).send({ message: "Internal server error", error });
  }
}

export async function getEventsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const events = await prisma.event.findMany({
      relationLoadStrategy: "query",
      orderBy: { startDate: "desc" },
      include: { createdBy: true },
    });

    return reply.status(200).send({ message: "ok", events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function getEventByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!event) return reply.status(404).send({ message: "Event not found" });

    return reply.status(200).send({ message: "ok", event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateEventHandler(
  req: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateEventSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const {
      createdById,
      isPublished,
      startDate,
      title,
      type,
      description,
      endDate,
      imageUrl,
      location,
      organizer,
    } = req.body;

    const existing = await prisma.event.findUnique({ where: { id } });

    if (!existing) return reply.status(404).send({ error: "Event not found" });

    const event = await prisma.event.update({
      where: { id },
      data: {
        createdById,
        isPublished,
        startDate,
        title,
        type,
        description,
        endDate,
        imageUrl,
        location,
        organizer,
      },
    });
    return reply
      .status(200)
      .send({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    return reply.status(400).send({ message: "Internal server error", error });
  }
}

export async function deleteEventHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing)
      return reply.status(404).send({ error: "Evento não encontrado" });

    await prisma.event.delete({ where: { id } });
    return reply.send({ message: "Evento eliminado com sucesso" });
  } catch (error) {
    console.error("Erro ao eliminar evento:", error);
    return reply.status(500).send({ error: "Falha ao eliminar evento" });
  }
}
