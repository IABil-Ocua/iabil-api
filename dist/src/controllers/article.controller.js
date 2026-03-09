"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleHandler = exports.updateArticleHandler = exports.getArticleByIdHandler = exports.getRecentArticlesHandler = exports.getArticlesHandler = exports.createArticleHandler = void 0;
const db_1 = require("../lib/db");
const createArticleHandler = async (request, reply) => {
    try {
        const { authorId, content, isFeatured, slug, status, title, category, imageUrl, publishedAt, tags, } = request.body;
        const article = await db_1.prisma.article.create({
            data: {
                authorId,
                content,
                isFeatured,
                slug,
                status,
                title,
                category,
                imageUrl,
                publishedAt,
                tags,
            },
        });
        return reply
            .status(201)
            .send({ message: "Article created successfully.", article });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Error creating the article." });
    }
};
exports.createArticleHandler = createArticleHandler;
const getArticlesHandler = async (rquest, reply) => {
    try {
        const articles = await db_1.prisma.article.findMany({
            relationLoadStrategy: "query",
            orderBy: { createdAt: "desc" },
            include: { author: true },
        });
        const safeArticles = articles.map((article) => {
            const { password, ...userWithoutPassword } = article.author;
            return {
                ...article,
                author: userWithoutPassword,
            };
        });
        return reply.status(200).send({ message: "ok", articles: safeArticles });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Error fetching articles." });
    }
};
exports.getArticlesHandler = getArticlesHandler;
const getRecentArticlesHandler = async (request, reply) => {
    try {
        const articles = await db_1.prisma.article.findMany({
            where: { status: "PUBLISHED" },
            orderBy: { publishedAt: "desc" },
            take: 3,
        });
        return reply.status(200).send({ message: "ok", articles });
    }
    catch (error) {
        console.error(error);
        return reply
            .status(500)
            .send({ message: "Error fetching recent articles." });
    }
};
exports.getRecentArticlesHandler = getRecentArticlesHandler;
const getArticleByIdHandler = async (request, reply) => {
    try {
        const { id } = request.params;
        const article = await db_1.prisma.article.findUnique({
            relationLoadStrategy: "query",
            where: { id },
            include: { author: true },
        });
        if (!article)
            return reply.status(404).send({ message: "Article not found." });
        const { password, ...userWithoutPassword } = article.author;
        const safeArticle = {
            ...article,
            author: userWithoutPassword,
        };
        return reply.status(200).send({ message: "ok", article: safeArticle });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Error fetching the article." });
    }
};
exports.getArticleByIdHandler = getArticleByIdHandler;
const updateArticleHandler = async (request, reply) => {
    try {
        const { id } = request.params;
        const { authorId, content, isFeatured, slug, status, title, category, imageUrl, publishedAt, tags, } = request.body;
        const updatedArticle = await db_1.prisma.article.update({
            where: { id },
            data: {
                authorId,
                content,
                isFeatured,
                slug,
                status,
                title,
                category,
                imageUrl,
                publishedAt,
                tags,
            },
        });
        return reply.status(200).send({
            message: "Article updated successfully.",
            article: updatedArticle,
        });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Error updating article." });
    }
};
exports.updateArticleHandler = updateArticleHandler;
const deleteArticleHandler = async (request, reply) => {
    try {
        const { id } = request.params;
        await db_1.prisma.article.delete({ where: { id } });
        return reply.send({ message: "Article deleted successfully." });
    }
    catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Error deleting article." });
    }
};
exports.deleteArticleHandler = deleteArticleHandler;
//# sourceMappingURL=article.controller.js.map