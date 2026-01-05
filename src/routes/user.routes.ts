import { FastifyTypedInstance } from "../types/zod";
import {
  fetchAuthenticatedUserHandler,
  listUsersHandler,
  registerUserHandler,
} from "../controllers/user.controller";
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
        summary: "Create new user",
        description: "Create a new user with automatic password generation and email confirmation",
        body: z.object({
          name: z.string().min(1, "Name is required."),
          email: z.string().min(1, "Email is required.").email("Invalid email format."),
          username: z.string().min(3, "The username is required"),
          avatar: z.string().optional(),
          cover: z.string().optional(),
          birthDate: z.coerce.date(),
          role: z
            .enum(["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"])
            .refine(
              (val) => ["SUPER_ADMIN", "ADMIN", "STUDENT", "GRADUETE"].includes(val),
              {
                message: "Role must be one of predefined values.",
              }
            ),
          avatarUrl: z.string().url("Invalid URL format").optional(),
        }),
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
