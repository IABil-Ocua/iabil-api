"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizzItemRoutes = quizzItemRoutes;
const zod_1 = __importDefault(require("zod"));
const quizz_item_controller_1 = require("../controllers/quizz-item.controller");
const quizz_items_schema_1 = require("../schemas/quizz-items.schema");
async function quizzItemRoutes(app) {
    app.get("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizz-items"],
            description: "Fetch all quizz items",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    quizzItems: zod_1.default.array(quizz_items_schema_1.quizzItemSchema),
                })
                    .describe("Quizz items fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_item_controller_1.fetchQuizzItemsHandler);
    app.get("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizz-items"],
            description: "Fetch quizz item by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Quizz item unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    quizzItem: quizz_items_schema_1.quizzItemSchema,
                })
                    .describe("Quizz item fetched successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_item_controller_1.fetchQuizzItemHandler);
    app.post("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizz-items"],
            description: "Create quizz item",
            body: quizz_items_schema_1.createQuizzItemSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    quizzItem: quizz_items_schema_1.quizzItemSchema,
                })
                    .describe("Quizz item created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_item_controller_1.createQuizzItemHandler);
    app.put("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizz-items"],
            description: "Update quizz item by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Quizz item unique identifier"),
            }),
            body: quizz_items_schema_1.updateQuizzItemSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    quizzItem: quizz_items_schema_1.quizzItemSchema,
                })
                    .describe("Quizz item updated successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_item_controller_1.updateQuizzItemHandler);
    app.delete("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["quizz-items"],
            description: "Delete quizz item by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Quizz item unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Quizz item deleted successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, quizz_item_controller_1.deleteQuizzItemHandler);
}
//# sourceMappingURL=quizz-item.routes.js.map