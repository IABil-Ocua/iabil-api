import z, { coerce } from "zod";
import { FastifyTypedInstance } from "../types/zod";

import {
  studentSchema,
  createStudentSchema,
  updateStudentSchema,
} from "../schemas/student.schema";
import {
  deleteStudentHandler,
  fetchStudentsHandler,
  fetchStudentByIdHandler,
  createManyStudentsHandler,
  updateStudentHandler,
  exportExcelHandler,
  createStudentHandler,
} from "../controllers/student.controller";


export async function studentRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Fetch all students",
        response: {
          200: z
          .object({
            message:z.string(),
            students:z.array(studentSchema),
          })
          .describe("students fetched successfully"),

          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchStudentsHandler
  );

  app.get(
    "/export",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Export all students data as Excel file",
        response: {
          200: z
          .unknown()
          .describe(" Excel file exported successfully"),

          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    exportExcelHandler
  );

  app.get(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Fetch student information by ID",
        params: z.object({
          id: z.cuid().describe("Student unique identifier"),
        }),
        response: {
          200: z
          .object({
            message: z.string(),
              student: studentSchema,
          })
          .describe("Student fetched successfully"),

          404: z
          .object({ message: z.string() })
          .describe("Student not found"),

          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchStudentByIdHandler
  );

  app.post(
    "/create-many",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Create many students",
        body: z.array(studentSchema),
        response: {
          201: z
            .object({
              message: z.string(),
              students:z.array(studentSchema),
            })
            .describe("students created successfully"),

          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createManyStudentsHandler
  );

  app.post(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Create new student and associated user account",
        body: createStudentSchema,
        response: {
          201: z
            .object({
              message: z.string(),
              user: z.object({
                id: z.cuid(),
                email: z.string().email(),
                name: z.string(),
                role: z.string(),
              })
            })
            .describe("Student created successfully"),

          400: z
            .object({ message: z.string() })
            .describe("Bad request"),

          409: z
           .object ({ message: z.string() })
           .describe ("Student code or email exists"),

          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createStudentHandler
  );

  app.put(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Update student information by ID",
        params: z.object({
          id: z.cuid().describe("Student unique identifier"),
        }),
        body: updateStudentSchema,
        response: {
          200:z
          .object({
            message:z.string(),
            student: studentSchema,
          })
           .describe("Student updated successfully"),

          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Student not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateStudentHandler
  );

  app.delete(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Delete a student by ID",
        params: z.object({
          id: z.cuid().describe("Student unique identifier"),
        }),
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Student deleted successfully"),
          404: z.object({ message: z.string() }).describe("Student not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteStudentHandler
  );
}
