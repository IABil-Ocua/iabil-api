import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  createEventHandler,
  getEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/events.controller";
import {
  eventSchema, 
  eventWithRelationsSchema, 
  createEventSchema,
  updateEventSchema,
} from "../schemas/event.schema"

export async function eventRoutes(app: FastifyTypedInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["events"],
        description: "Create a new event with details, dates, and metadata",
        body: createEventSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              event: createEventSchema,
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
              events: z.array(eventSchema),
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
              event: eventWithRelationsSchema,
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
        body: updateEventSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              event: updateEventSchema,
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
