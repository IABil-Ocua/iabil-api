import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import {
  createArticleSchema,
  updateArticleSchema,
} from "../schemas/article.schema";
import z from "zod";

export const createArticleHandler = async (
  request: FastifyRequest<{ Body: z.infer<typeof createArticleSchema> }>,
  reply: FastifyReply
) => {
  try {
    const {
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
    } = request.body;

    const article = await prisma.article.create({
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
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Error creating the article." });
  }
};

export const getArticlesHandler = async (
  rquest: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const articles = await prisma.article.findMany({
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
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Error fetching articles." });
  }
};

export const getRecentArticlesHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    return reply.status(200).send({ message: "ok", articles });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ message: "Error fetching recent articles." });
  }
};

export const getArticleByIdHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const article = await prisma.article.findUnique({
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
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Error fetching the article." });
  }
};

// ✅ Atualizar artigo
export const updateArticleHandler = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateArticleSchema>;
  }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const {
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
    } = request.body;

    const updatedArticle = await prisma.article.update({
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

    return reply
      .status(200)
      .send({ message: "Article updated successfully.", article: updatedArticle });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Error updating article." });
  }
};

export const deleteArticleHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await prisma.article.delete({ where: { id } });

    return reply.send({ message: "Article deleted successfully." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Error deleting article." });
  }
};
