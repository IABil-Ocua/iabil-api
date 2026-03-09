"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleSchema = exports.createArticleSchema = exports.articleWithRelationsSchema = exports.articleSchema = exports.ArticleCategoryEnum = exports.ArticleStatusEnum = void 0;
const zod_1 = require("zod");
const user_schema_1 = require("./user.schema");
exports.ArticleStatusEnum = zod_1.z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
exports.ArticleCategoryEnum = zod_1.z.enum(["INNOVATION", "PUBLICATION"]);
exports.articleSchema = zod_1.z.object({
    id: zod_1.z.cuid(),
    title: zod_1.z.string(),
    slug: zod_1.z.string(),
    content: zod_1.z.string(),
    imageUrl: zod_1.z.string().nullable(),
    category: exports.ArticleCategoryEnum,
    tags: zod_1.z.string().nullable(),
    status: exports.ArticleStatusEnum.default("DRAFT"),
    isFeatured: zod_1.z.boolean().default(false),
    authorId: zod_1.z.string(),
    publishedAt: zod_1.z.coerce.date().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.articleWithRelationsSchema = zod_1.z.lazy(() => exports.articleSchema.extend({
    author: user_schema_1.userSchema,
}));
exports.createArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters."),
    slug: zod_1.z.string().min(3, "Invalid slug."),
    content: zod_1.z.string().min(10, "Content is required."),
    imageUrl: zod_1.z.string().url().optional().nullable(),
    category: exports.ArticleCategoryEnum,
    tags: zod_1.z.string().optional().nullable(),
    status: exports.ArticleStatusEnum.default("DRAFT"),
    isFeatured: zod_1.z.boolean().default(false),
    authorId: zod_1.z.string(),
    publishedAt: zod_1.z.coerce.date().optional().nullable(),
});
exports.updateArticleSchema = exports.createArticleSchema.partial();
//# sourceMappingURL=article.schema.js.map