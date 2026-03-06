import z from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  fetchAuthenticatedUserHandler,
  fetchUserHandler,
  listUsersHandler,
  registerUserHandler,
} from "../controllers/user.controller";
import { userSchema, createUserSchema } from "./../schemas/user.schema";

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch all users",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    listUsersHandler,
  );

  app.get(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch user by ID",
        params: z.object({
          id: z.cuid().describe("User unique identifier"),
        }),
        response: {
          200: z
            .object({
              message: z.string(),
              user: userSchema,
            })
            .describe("User fetched successfully"),
          404: z.object({ message: z.string() }).describe("User not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchUserHandler,
  );

  app.get(
    "/me",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch authenticated user",
        response: {
          /** 200: z
            .object({
              message: z.string(),
              user: userSchema,
            })
            .describe("User fetched successfully"), */
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
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Create a new user",
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
