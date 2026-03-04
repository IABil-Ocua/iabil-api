import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { Resend } from "resend";
import { hash } from "bcrypt";

import { prisma } from "../lib/db";
import { passwordGenerator } from "../lib/password-generator";
import {
  createTeacherSchema,
  updateTeacherSchema,
} from "../schemas/teacher.schema";
import { UserRegistrationTemplate } from "../email/user-registration";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createTeacherHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createTeacherSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { email, name, academicTitle, department, phoneNumber, specialty } =
      createTeacherSchema.parse(request.body);

    const [existingTeacherByEmail, existingUserByEmail] = await Promise.all([
      prisma.teacher.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingTeacherByEmail) {
      return reply.status(409).send({
        errorCode: "TEACHER_REGISTERED",
        message: "There is already a teacher with this email address..",
      });
    }
    if (existingUserByEmail) {
      return reply.status(409).send({
        errorCode: "USER_REGISTERED",
        message: "A user with this email address already exists.",
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
          name,
          email,
          username: email,
          password: hashedPassword,
          role: "TEACHER",
        },
      });

      const teacher = await tx.teacher.create({
        data: {
          name: name,
          email,
          phoneNumber: phoneNumber ?? null,
          academicTitle: academicTitle ?? null,
          specialty: specialty ?? null,
          department: department ?? null,
          userId: user.id,
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
          role: "TEACHER",
        }) as React.ReactElement,
      });

      if (error) {
        return reply.status(500).send({
          errorCode: "EMAIL_SENDING_ERROR",
          message: "An error ocurred sending email",
        });
      }

      return { teacher, user, emailId: emailData.id };
    });

    return reply.status(201).send({
      message: "Teacher created successfully.",
      teacher: result.teacher,
      emailId: result.emailId,
    });
  } catch (error: any) {
    console.error(error);
    return reply
      .status(500)
      .send({ errorCode: "SERVER_ERROR", message: "Internal server error" });
  }
}

export async function getTeachersHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return reply.send({ message: "ok", teachers });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

export async function getTeacherByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!teacher) {
      return reply.status(404).send({ message: "Teacher not found" });
    }

    return reply.send({ message: "ok", teacher });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

export async function updateTeacherHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateTeacherSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { academicTitle, department, email, name, phoneNumber, specialty } =
      updateTeacherSchema.parse(request.body);

    const existing = await prisma.teacher.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existing) {
      return reply.status(404).send({ message: "Teacher not found" });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userWithEmail && userWithEmail.id !== existing.userId) {
      return reply.status(400).send({
        message: "This email address is already in use by another user..",
      });
    }

    const teacherWithEmail = await prisma.teacher.findUnique({
      where: { email },
    });
    if (teacherWithEmail && teacherWithEmail.id !== id) {
      return reply.status(400).send({
        message: "This email address is already in use by another professor.",
      });
    }

    const updated = await prisma.$transaction(async (tx) => {
      // atualiza user

      await tx.user.update({
        where: { id: existing.userId },
        data: {
          name,
          email,
          username: email,
        },
      });

      const teacher = await tx.teacher.update({
        where: { id },
        data: {
          name,
          email,
          phoneNumber,
          academicTitle,
          specialty,
          department,
        },
        include: { user: true },
      });

      return teacher;
    });

    return reply.send({
      message: "Professor atualizado com sucesso.",
      teacher: updated,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}

export async function deleteTeacherHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const existing = await prisma.teacher.findUnique({ where: { id } });
    if (!existing) {
      return reply.status(404).send({ message: "Teacher not found." });
    }

    await prisma.teacher.delete({ where: { id } });

    return reply.send({ message: "Teacher deleted successfully." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
