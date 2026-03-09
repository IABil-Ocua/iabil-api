"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoutes = moduleRoutes;
const zod_1 = __importDefault(require("zod"));
const module_controller_1 = require("../controllers/module.controller");
const module_schema_1 = require("../schemas/module.schema");
async function moduleRoutes(app) {
    app.get("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["modules"],
            description: "Fetch all modules",
            response: {
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, module_controller_1.fetchModulesHandler);
    app.get("/level/:levelId", {
        preHandler: app.authenticate,
        schema: {
            tags: ["modules"],
            description: "Fetch modules by level",
            response: {
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, module_controller_1.fetchModulesByLevelHandler);
    app.get("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["modules"],
            description: "Fetch module by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Module unique identifier"),
            }),
            response: {
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, module_controller_1.fetchModuleHandler);
    app.post("/", {
        preHandler: app.authenticate,
        schema: {
            tags: ["modules"],
            description: "Create module",
            body: module_schema_1.createModuleSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    module: module_schema_1.moduleSchema,
                })
                    .describe("Module created successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, module_controller_1.createModuleHandler);
    app.put("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["modules"],
            description: "Update module",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Module unique identifier"),
            }),
            body: module_schema_1.updateModuleSchema,
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    module: module_schema_1.moduleSchema,
                })
                    .describe("Module updated successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, module_controller_1.updateModuleHandler);
    app.delete("/:id", {
        preHandler: app.authenticate,
        schema: {
            tags: ["modules"],
            description: "Delete module",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("Module unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                })
                    .describe("Module deleted successfully"),
                400: zod_1.default.object({ message: zod_1.default.string() }).describe("Bad request"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("Not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, module_controller_1.deleteModuleHandler);
}
//# sourceMappingURL=module.routes.js.map