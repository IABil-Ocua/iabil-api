import { fastify } from "fastify";
import cors from "@fastify/cors";
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyJwtPlugin from "./plugins/jwt";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { qualificationRoutes } from "./routes/qualification.routes";
import { studentRoutes } from "./routes/student.routes";
import { eventRoutes } from "./routes/events.route";
import { articleRoutes } from "./routes/articles.routes";
import { jobVacanciesRoutes } from "./routes/job-vacancies.routes";
import { scholarshipRoutes } from "./routes/scholarship.routes";
import { levelRoutes } from "./routes/level.route";
import { chapterRoutes } from "./routes/chapter.routes";
import { quizzRoutes } from "./routes/quizz.routes";
import { quizzItemRoutes } from "./routes/quizz-item.routes";
import { moduleRoutes } from "./routes/module.routes";
import { teacherRoutes } from "./routes/teacher.routes";

const app =
  fastify(/**{
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
} */).withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
});

app.register(fastifyJwtPlugin);

app.setValidatorCompiler(validatorCompiler); // Tells Fastify that Zod will be used for input validations
app.setSerializerCompiler(serializerCompiler); // Tells Fastify that Zod will be used for output data serialization

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "IABil-Documenting API",
      version: "1.0.0",
      description: "API documentation for the IABil backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    /**security: [
      {
        bearerAuth: [],
      },
    ], */
  },
  transform: jsonSchemaTransform,
});

// Swagger UI configuration
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "none",
    deepLinking: false,
  },
});

//ROTAS DOS ENDPOITS
app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });
app.register(qualificationRoutes, { prefix: "/qualifications" });
app.register(studentRoutes, { prefix: "/students" });
app.register(teacherRoutes, { prefix: "/teachers" });
app.register(eventRoutes, { prefix: "/events" });
app.register(articleRoutes, { prefix: "/articles" });
app.register(jobVacanciesRoutes, { prefix: "/job-vacancies" });
app.register(scholarshipRoutes, { prefix: "/scholarships" });
app.register(levelRoutes, { prefix: "/levels" });
app.register(chapterRoutes, { prefix: "/chapters" });
app.register(quizzRoutes, { prefix: "/quizzes" });
app.register(quizzItemRoutes, { prefix: "/quizz-items" });
app.register(moduleRoutes, { prefix: "/modules" });

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log(`Server running at port ${3333}`);
});
