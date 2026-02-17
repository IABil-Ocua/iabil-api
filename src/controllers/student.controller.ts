import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import ExcelJS from "exceljs";

import { prisma } from "../lib/db";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../schemas/student.schema";
import { hash } from "bcrypt";
//import { passwordGenerator } from "../lib/password-generator";

/**export async function createManyStudentsHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createStudentSchema>[] }>,
  reply: FastifyReply,
) {
  try {
    const studentsData = request.body;



    const createdStudents = await prisma.student.createMany({
      data: studentsData,
    });

    return reply.status(201).send({
      message: "Students registered successfully!",
      students: createdStudents,
    });
  } catch (error) {
    console.error("Error creating students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
} */

export async function createStudentHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createStudentSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { qualificationId, email, name, code, ...rest } = request.body;

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [{ code }, { email }],
      },
    });

    if (existingStudent) {
      return reply
        .status(400)
        .send({ message: "Student code already registered" });
    }

    if (!email) {
      return reply
        .status(400)
        .send({ message: "Email is required to create login user" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return reply
        .status(400)
        .send({ message: "Email already registered as user" });
    }

    /**const password = passwordGenerator({
      passwordLength: 8,
      useLowerCase: true,
      useNumbers: true,
      useSymbols: false,
      useUpperCase: true,
    }); */

    const hashedPassword = await hash("IABIL2025", 10);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: email.toLowerCase().trim(),
          name,
          password: hashedPassword,
          username: email.toLowerCase().trim(),
          role: "STUDENT",
        },
      });

      const student = await tx.student.create({
        data: {
          ...rest,
          name,
          code,
          email: email.toLowerCase().trim(),
          qualificationId,
          userId: user.id,
        },
      });

      return { user, student };
    });

    return reply.status(201).send({
      message: "Student and User created",
      student: result.student,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

export async function fetchStudentsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const students = await prisma.student.findMany({
      relationLoadStrategy: "query",
      orderBy: {
        createdAt: "asc",
      },
    });

    return reply.status(200).send({ message: "ok", students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchStudentByIdHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Student ID not provided" });
    }

    const student = await prisma.student.findUnique({
      relationLoadStrategy: "query",
      where: {
        id,
      },
    });

    if (!student) {
      return reply.status(404).send({ message: "Student not found." });
    }

    return reply.status(200).send({ message: "ok", student });
  } catch (error) {
    console.error("Error fetching students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function exportExcelHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const students = await prisma.student.findMany();

    //Create a workbook and a sheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    //Column headers
    worksheet.columns = [
      { header: "ID", key: "id", width: 35 },
      { header: "Name", key: "name", width: 25 },
      { header: "Code", key: "code", width: 15 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Email", key: "email", width: 25 },
    ];

    //Add the rows
    students.forEach((student) => worksheet.addRow(student));

    // Preparar resposta
    const buffer = await workbook.xlsx.writeBuffer();

    reply
      .header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      )
      .header("Content-Disposition", "attachment; filename=students.xlsx")
      .status(200)
      .send(Buffer.from(buffer));
  } catch (error) {
    console.log(error);
    return reply
      .status(500)
      .send({ message: "An internal server error occurred", error });
  }
}

export async function updateStudentHandler(
  request: FastifyRequest<{
    Body: z.infer<typeof updateStudentSchema>;
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Student ID not provided" });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return reply.status(404).send({ message: "Student not found." });
    }

    const { birthDate, email, gender, name, code, financier, specialty } =
      request.body;

    const student = await prisma.$transaction(
      async (tx) => {
        const student = await tx.student.update({
          where: { id },
          data: {
            birthDate,
            email,
            gender,
            name,
            code,
            financier,
            specialty,
          },
        });

        return student;
      },
      { timeout: 20000 },
    );

    return reply
      .status(200)
      .send({ message: "Student updated successfully", student });
  } catch (error) {
    console.log("Error update student:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteStudentHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Student ID not provided" });
    }

    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return reply.status(404).send({ message: "Student not found." });
    }

    await prisma.$transaction(
      async (tx) => {
        await tx.student.delete({
          where: {
            id,
          },
        });
      },
      { timeout: 20000 },
    );

    return reply.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.log("Error deleting student:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
