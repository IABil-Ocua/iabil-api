import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { compare, hash } from "bcrypt";
import { Resend } from "resend";

import { createUserSchema, loginSchema } from "../schemas/user.schema";
import { prisma } from "../lib/db";
import { UserRegistrationTemplate } from "../email/user-registration";
import { passwordGenerator } from "../lib/password-generator";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function loginHandler(
  request: FastifyRequest<{ Body: z.infer<typeof loginSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const passwordMatch = user.password
      ? await compare(password, user.password)
      : false;

    if (!passwordMatch) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const token = await reply.jwtSign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: "1d" },
    );

    return reply.status(200).send({ message: "ok", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function listUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const users = await prisma.user.findMany({
      include: {
        student: true,
        teacher: true,
      },
    });

    const safeUsers = users.map(({ password, ...rest }) => rest);

    return reply.status(200).send({ message: "ok", users: safeUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function fetchUserHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    const { password, ...rest } = user;

    return reply.status(200).send({ message: "ok", user: rest });
  } catch (error) {
    console.error("Error fetching user  :", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function registerUserHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createUserSchema> }>,
  reply: FastifyReply,
) {
  try {
    const { email, name, role, avatar } = request.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply
        .status(400)
        .send({ message: "A user with the same email is already registered" });
    }

    const generatedPassword = passwordGenerator({
      passwordLength: 8,
      useLowerCase: true,
      useNumbers: true,
      useSymbols: false,
      useUpperCase: true,
    });

    const hashedPassword = await hash(generatedPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        password: hashedPassword,
        role: role,
        username: email.toLowerCase().trim(),
        avatar,
      },
    });

    const { data: emailData, error } = await resend.emails.send({
      from: "IAbil <gestao.academica@iabil.co.mz>",
      to: [email],
      subject: "Registration Confirmation on the IABIl Platform",
      react: UserRegistrationTemplate({
        name: name,
        email: email.toLowerCase().trim(),
        password: generatedPassword,
        platformName: "IABil",
        loginUrl: "https://iabil.co.mz/login",
        role: role,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending email:", error);
      return reply
        .status(500)
        .send({ error: "Error sending confirmation email" });
    }

    const { password, ...rest } = user;

    return reply.status(201).send({
      message: "User created successfully",
      user: rest,
      emailId: emailData.id,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function fetchAuthenticatedUserHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = request.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send({
      message: "ok",
      user,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}
