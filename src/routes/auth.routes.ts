import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import { loginHandler } from "../controllers/user.controller";
import { loginSchema } from "../schemas/user.schema";


export async function authRoutes(app: FastifyTypedInstance) {
  app.post(
    "/login",
    {
      schema: {
        tags: ["auth"],
        description: "Authenticate user and return JWT token",
        body: loginSchema,
        response: {
          200: z
            .object({
              message: z.string(),
              token: z.string(),
              user: z.object({
                id: z.string().uuid(),
                email: z.string().email(),
                name: z.string(),
                role: z.enum(["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"]),
              }),
            })
            .describe("Login successful"),
          401: z.object({ message: z.string() }).describe("Invalid credentials"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    loginHandler
  );
}
