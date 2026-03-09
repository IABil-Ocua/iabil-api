"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchModulesHandler = fetchModulesHandler;
exports.fetchModulesByLevelHandler = fetchModulesByLevelHandler;
exports.fetchModuleHandler = fetchModuleHandler;
exports.createModuleHandler = createModuleHandler;
exports.updateModuleHandler = updateModuleHandler;
exports.deleteModuleHandler = deleteModuleHandler;
const db_1 = require("../lib/db");
async function fetchModulesHandler(request, reply) {
    try {
        const modules = await db_1.prisma.module.findMany({
            relationLoadStrategy: "query",
            include: {
                chapters: { include: { module: true } },
                level: true,
            },
        });
        return reply.status(200).send({ message: "ok", modules });
    }
    catch (error) {
        console.log("Error fetching modules", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchModulesByLevelHandler(request, reply) {
    try {
        const { levelId } = request.params;
        const modules = await db_1.prisma.module.findMany({
            relationLoadStrategy: "query",
            include: {
                chapters: { include: { module: true } },
                level: true,
            },
            where: {
                levelId,
            },
        });
        return reply.status(200).send({ message: "ok", modules });
    }
    catch (error) {
        console.log("Error fetching modules", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function fetchModuleHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Module ID not provided" });
        }
        const module = await db_1.prisma.module.findUnique({
            relationLoadStrategy: "query",
            include: {
                chapters: { include: { module: true } },
                level: true,
            },
            where: {
                id,
            },
        });
        if (!module) {
            return reply.status(404).send({ message: "Module not found" });
        }
        return reply.status(200).send({ message: "ok", module });
    }
    catch (error) {
        console.log("Error fetching module", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function createModuleHandler(request, reply) {
    try {
        const { title, description, levelId, workload, documentUrl } = request.body;
        const module = await db_1.prisma.module.create({
            data: {
                title,
                description,
                levelId,
                workload,
                documentUrl,
            },
        });
        return reply
            .status(201)
            .send({ message: "Module created succsessfylly", module });
    }
    catch (error) {
        console.log("Error creating module", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function updateModuleHandler(request, reply) {
    try {
        const { id } = request.params;
        const { description, levelId, title, workload } = request.body;
        if (!id) {
            return reply.status(400).send({ message: "Module ID not provided" });
        }
        const module = await db_1.prisma.module.findUnique({
            where: {
                id,
            },
        });
        if (!module) {
            return reply.status(404).send({ message: "Module not found" });
        }
        const updatedModule = await db_1.prisma.module.update({
            data: {
                description,
                levelId,
                title,
                workload,
            },
            where: {
                id,
            },
        });
        return reply.status(200).send({
            message: "Module updated successfully",
            module: updatedModule,
        });
    }
    catch (error) {
        console.log("Error updating module", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
async function deleteModuleHandler(request, reply) {
    try {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: "Module ID not provided" });
        }
        const module = await db_1.prisma.module.findUnique({
            where: {
                id,
            },
        });
        if (!module) {
            return reply.status(404).send({ message: "Module not found" });
        }
        await db_1.prisma.module.delete({
            where: {
                id,
            },
        });
        return reply.status(200).send({ message: "Module deleted successfylly" });
    }
    catch (error) {
        console.log("Error deleting module", error);
        return reply.status(500).send({ message: "Internal server error", error });
    }
}
//# sourceMappingURL=module.controller.js.map