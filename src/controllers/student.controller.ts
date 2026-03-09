import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod";
import ExcelJS from "exceljs";
import { hash } from "bcrypt";

import { prisma } from "../lib/db";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../schemas/student.schema";

import { passwordGenerator } from "../lib/password-generator";
import { Resend } from "resend";
import { UserRegistrationTemplate } from "../email/user-registration";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const {
      qualificationId,
      email,
      name,
      code,
      status,
      approvalStatus,
      currentLevelId,
      ...rest
    } = request.body;

    const existingStudentCode = await prisma.student.findFirst({
      where: {
        code,
      },
    });

    if (existingStudentCode) {
      return reply.status(409).send({
        errorCode: "STUDENT_CODE_ALREADY_REGISTERED",
        message: "Student with same code already registered",
      });
    }

    const existingStudentEmail = await prisma.student.findFirst({
      where: {
        email,
      },
    });

    if (existingStudentEmail) {
      return reply.status(409).send({
        errorCode: "STUDENT_EMAIL_ALREADY_REGISTERED",
        message: "Student with same email already registered",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return reply.status(409).send({
        errorCode: "USER_EMAIL_REGISTERED",
        message: "Email already registered as user",
      });
    }

    const password = passwordGenerator({
      passwordLength: 8,
      useLowerCase: true,
      useNumbers: true,
      useSymbols: false,
      useUpperCase: true,
    });

    const hashedPassword = await hash(password, 10);

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
          approvalStatus,
          status,
          currentLevelId,
        },
      });

      const { data: emailData, error } = await resend.emails.send({
        from: "IAbil <gestao.academica@iabil.co.mz>",
        to: [email],
        subject: "Registration Confirmation on the IABIl Platform",
        react: UserRegistrationTemplate({
          name: name,
          email: email.toLowerCase().trim(),
          password: password,
          platformName: "IABil",
          loginUrl: "https://iabil.co.mz/login",
          role: "STUDENT",
        }) as React.ReactElement,
      });

      if (error) {
        return reply.status(500).send({
          errorCode: "EMAIL_SENDING_ERROR",
          message: "An error ocurred sending email",
        });
      }

      return { user, student, emailId: emailData?.id };
    });

    return reply.status(201).send({
      message: "Student created successfully",
      student: result.student,
      emailId: result.emailId,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return reply
      .status(500)
      .send({ errorCode: "SERVER_ERROR", message: "Internal server error" });
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
