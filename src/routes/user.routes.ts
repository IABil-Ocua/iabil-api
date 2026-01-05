import { FastifyTypedInstance } from "../types/zod";
import {
  fetchAuthenticatedUserHandler,
  listUsersHandler,
  registerUserHandler,
} from "../controllers/user.controller";
import { registerUserBodySchema } from "../schemas/user.schema";
import z from "zod";

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch all users",
        response: {
          200: z
            .object({
              message: z.string(),
              users: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  role: z.string(),
                  avatar: z.string().nullable(),
                  createdAt: z.coerce.date(),
                  updatedAt: z.coerce.date(),
                })
              ),
            })
            .describe("Users fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    listUsersHandler
  );

  app.post(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Create a new user with automatic password generation and email confirmation",
        body: registerUserBodySchema,
        response: {
          201: z
            .object({
              message: z.string(),
              user: z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                role: z.enum(["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"]),
                username: z.string(),
                avatar: z.string().nullable(),
                birthDate: z.date().nullable(),
                createdAt: z.date(),
              }),
            })
            .describe("User created successfully"),
          400: z.object({ message: z.string() }).describe("User already exists"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    registerUserHandler
  );

  app.get(
    "/me",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch authenticated user",
        response: {
          200: z
            .object({
              message: z.string(),
              user: z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
                role: z.enum(["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"]),
                avatar: z.string().nullable(),
                createdAt: z.string(),
                updatedAt: z.string(),
              }),
            })
            .describe("User fetched successfully"),
          404: z.object({ message: z.string() }).describe("User not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchAuthenticatedUserHandler
  );
}
