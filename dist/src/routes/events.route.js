"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = eventRoutes;
const zod_1 = __importDefault(require("zod"));
const events_controller_1 = require("../controllers/events.controller");
const event_schema_1 = require("../schemas/event.schema");
async function eventRoutes(app) {
    app.post("/", {
        schema: {
            tags: ["events"],
            description: "Create a new event with details, dates, and metadata",
            body: event_schema_1.createEventSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    event: event_schema_1.eventSchema,
                })
                    .describe("Event created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, events_controller_1.createEventHandler);
    app.get("/", {
        schema: {
            tags: ["events"],
            description: "Retrieve a list of events with creator information",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    events: zod_1.default.array(event_schema_1.eventWithRelationsSchema),
                })
                    .describe("Events fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, events_controller_1.getEventsHandler);
    app.get("/:id", {
        schema: {
            tags: ["events"],
            description: "Get detailed event information by ID with creator data",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Event unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    event: event_schema_1.eventWithRelationsSchema,
                })
                    .describe("Event fetched successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Event not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, events_controller_1.getEventByIdHandler);
    app.put("/:id", {
        schema: {
            tags: ["events"],
            description: "Update an existing event by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Event unique identifier"),
            }),
            body: event_schema_1.updateEventSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    event: event_schema_1.eventSchema,
                })
                    .describe("Event updated successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Event not found"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, events_controller_1.updateEventHandler);
    app.delete("/:id", {
        schema: {
            tags: ["events"],
            description: "Delete an event by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Event unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Event deleted successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Event not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, events_controller_1.deleteEventHandler);
}
//# sourceMappingURL=events.route.js.map