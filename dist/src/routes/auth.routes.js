"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const zod_1 = __importDefault(require("zod"));
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schemas/user.schema");
async function authRoutes(app) {
    app.post("/login", {
        schema: {
            tags: ["auth"],
            description: "Authenticate user and return JWT token",
            body: user_schema_1.loginSchema,
            response: {
                401: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Invalid credentials"),
                500: zod_1.default
                    .object({ message: zod_1.default.string() })
                    .describe("Internal server error"),
            },
        },
    }, user_controller_1.loginHandler);
}
//# sourceMappingURL=auth.routes.js.map