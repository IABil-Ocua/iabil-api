import {
  createEventHandler,
  getEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/events.controller";
import { FastifyTypedInstance } from "../types/zod";
import { createEventSchema, eventTypeEnum } from "../schemas/event.schema";
import z from "zod";

export async function eventRoutes(app: FastifyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["events"],
        description: "Create a new event with details, dates, and metadata",
        body: z.object({
          title: z.string().min(3, "Title must be at least 3 characters"),
          description: z.string().max(2000).optional(),
          startDate: z.coerce.date(),
          endDate: z.coerce.date().optional(),
          location: z.string().optional(),
          type: eventTypeEnum,
          imageUrl: z.string().url().optional(),
          organizer: z.string().optional(),
          isPublished: z.boolean().default(false),
          createdById: z.string().uuid(),
        }),
        response: {
          201: z
            .object({
              message: z.string(),
              event: z.object({
                id: z.string().cuid(),
                title: z.string(),
                description: z.string().optional(),
                startDate: z.date(),
                endDate: z.date().optional(),
                location: z.string().optional(),
                type: eventTypeEnum,
                imageUrl: z.string().url().optional(),
                organizer: z.string().optional(),
                isPublished: z.boolean(),
                createdById: z.string().uuid(),
                createdBy: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string().email(),
                }),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Event created successfully"),
          400: z.object({ error: z.string() }).describe("Bad request"),
          500: z.object({ error: z.string() }).describe("Internal server error"),
        },
      },
    },
    createEventHandler
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["events"],
        description: "Retrieve a list of events with creator information",
        response: {
          200: z
            .object({
              message: z.string(),
              events: z.array(
                z.object({
                  id: z.string().cuid(),
                  title: z.string(),
                  description: z.string().optional(),
                  startDate: z.date(),
                  endDate: z.date().optional(),
                  location: z.string().optional(),
                  type: eventTypeEnum,
                  imageUrl: z.string().url().optional(),
                  organizer: z.string().optional(),
                  isPublished: z.boolean(),
                  createdBy: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    email: z.string().email(),
                  }),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            })
            .describe("Events fetched successfully"),
          500: z.object({ error: z.string() }).describe("Internal server error"),
        },
      },
    },
    getEventsHandler
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["events"],
        description: "Get detailed event information by ID with creator data",
        params: z.object({
          id: z.string().cuid().describe("Event unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              event: z.object({
                id: z.string().cuid(),
                title: z.string(),
                description: z.string().optional(),
                startDate: z.date(),
                endDate: z.date().optional(),
                location: z.string().optional(),
                type: eventTypeEnum,
                imageUrl: z.string().url().optional(),
                organizer: z.string().optional(),
                isPublished: z.boolean(),
                createdBy: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string().email(),
                }),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Event fetched successfully"),
          404: z.object({ message: z.string() }).describe("Event not found"),
          500: z.object({ error: z.string() }).describe("Internal server error"),
        },
      },
    },
    getEventByIdHandler
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["events"],
        description: "Update an existing event by ID",
        params: z.object({
          id: z.string().cuid().describe("Event unique identifier"),
        }),
        body: createEventSchema.partial(),
        response: {
          200: z
            .object({
              message: z.string(),
              event: z.object({
                id: z.string().cuid(),
                title: z.string(),
                description: z.string().optional(),
                startDate: z.date(),
                endDate: z.date().optional(),
                location: z.string().optional(),
                type: eventTypeEnum,
                imageUrl: z.string().url().optional(),
                organizer: z.string().optional(),
                isPublished: z.boolean(),
                createdById: z.string().uuid(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .describe("Event updated successfully"),
          404: z.object({ error: z.string() }).describe("Event not found"),
          400: z.object({ error: z.string() }).describe("Bad request"),
          500: z.object({ error: z.string() }).describe("Internal server error"),
        },
      },
    },
    updateEventHandler
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["events"],
        description: "Delete an event by ID",
        params: z.object({
          id: z.string().cuid().describe("Event unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Event deleted successfully"),
          404: z.object({ error: z.string() }).describe("Event not found"),
          500: z.object({ error: z.string() }).describe("Internal server error"),
        },
      },
    },
    deleteEventHandler
  );
}
