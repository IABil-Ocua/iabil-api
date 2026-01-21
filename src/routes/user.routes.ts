import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  fetchAuthenticatedUserHandler,
  listUsersHandler,
  registerUserHandler,
} from "../controllers/user.controller";
import { userSchema, createUserSchema } from "./../schemas/user.schema";

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch all users",
        response: {
          200: z
            .object({
              message: z.string(),
              users: z.array(userSchema),
            })
            .describe("Users fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    listUsersHandler,
  );

  app.get(
    "/me",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch authenticated user",
        response: {
          404: z.object({ message: z.string() }).describe("User not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchAuthenticatedUserHandler,
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description:
          "Create a new user with automatic password generation and email confirmation",
        body: createUserSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              user: userSchema,
            })
            .describe("User created successfully"),
          400: z
            .object({ message: z.string() })
            .describe("User already exists"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    registerUserHandler,
  );
}
