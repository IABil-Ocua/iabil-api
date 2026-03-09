"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const zod_1 = __importDefault(require("zod"));
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("./../schemas/user.schema");
async function userRoutes(app) {
    app.get("/", {
        schema: {
            tags: ["users"],
            description: "Fetch all users",
            response: {
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, user_controller_1.listUsersHandler);
    app.get("/:id", {
        schema: {
            tags: ["users"],
            description: "Fetch user by ID",
            params: zod_1.default.object({
                id: zod_1.default.cuid().describe("User unique identifier"),
            }),
            response: {
                200: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    user: user_schema_1.userSchema,
                })
                    .describe("User fetched successfully"),
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("User not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, user_controller_1.fetchUserHandler);
    app.get("/me", {
        preHandler: app.authenticate,
        schema: {
            tags: ["users"],
            description: "Fetch authenticated user",
            response: {
                404: zod_1.default.object({ message: zod_1.default.string() }).describe("User not found"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, user_controller_1.fetchAuthenticatedUserHandler);
    app.post("/", {
        schema: {
            tags: ["users"],
            description: "Create a new user",
            body: user_schema_1.createUserSchema,
            response: {
                201: zod_1.default
                    .object({
                    message: zod_1.default.string(),
                    user: user_schema_1.userSchema,
                })
                    .describe("User created successfully"),
                400: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("User already exists"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, user_controller_1.registerUserHandler);
}
//# sourceMappingURL=user.routes.js.map