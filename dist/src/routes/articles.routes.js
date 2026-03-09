"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoutes = articleRoutes;
const zod_1 = __importDefault(require("zod"));
const article_controller_1 = require("../controllers/article.controller");
const article_schema_1 = require("../schemas/article.schema");
async function articleRoutes(app) {
    app.get("/", {
        schema: {
            tags: ["articles"],
            description: "List all articles",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    articles: zod_1.default.array(article_schema_1.articleWithRelationsSchema),
                })
                    .describe("Articles fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, article_controller_1.getArticlesHandler);
    app.get("/recent", {
        schema: {
            tags: ["articles"],
            description: "Get recent published articles",
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    articles: zod_1.default.array(article_schema_1.articleSchema),
                })
                    .describe("Recent articles fetched successfully"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, article_controller_1.getRecentArticlesHandler);
    app.get("/:id", {
        schema: {
            tags: ["articles"],
            description: "Get article information by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Article unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    article: article_schema_1.articleWithRelationsSchema,
                })
                    .describe("Article fetched successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Article not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, article_controller_1.getArticleByIdHandler);
    app.post("/", {
        schema: {
            tags: ["articles"],
            description: "Create new article",
            body: article_schema_1.createArticleSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    article: article_schema_1.articleSchema,
                })
                    .describe("Article created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, article_controller_1.createArticleHandler);
    app.put("/:id", {
        schema: {
            tags: ["articles"],
            description: "Update article by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Article unique identifier"),
            }),
            body: article_schema_1.updateArticleSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    article: article_schema_1.articleSchema,
                })
                    .describe("Article updated successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Article not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, article_controller_1.updateArticleHandler);
    app.delete("/:id", {
        schema: {
            tags: ["articles"],
            description: "Delete article by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Article unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Article deleted successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Article not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, article_controller_1.deleteArticleHandler);
}
//# sourceMappingURL=articles.routes.js.map