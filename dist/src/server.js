"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const jwt_1 = __importDefault(require("./plugins/jwt"));
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const qualification_routes_1 = require("./routes/qualification.routes");
const student_routes_1 = require("./routes/student.routes");
const events_route_1 = require("./routes/events.route");
const articles_routes_1 = require("./routes/articles.routes");
const job_vacancies_routes_1 = require("./routes/job-vacancies.routes");
const scholarship_routes_1 = require("./routes/scholarship.routes");
const level_route_1 = require("./routes/level.route");
const chapter_routes_1 = require("./routes/chapter.routes");
const quizz_routes_1 = require("./routes/quizz.routes");
const quizz_item_routes_1 = require("./routes/quizz-item.routes");
const module_routes_1 = require("./routes/module.routes");
const teacher_routes_1 = require("./routes/teacher.routes");
const app = (0, fastify_1.fastify)().withTypeProvider();
app.register(cors_1.default, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
});
app.register(jwt_1.default);
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(swagger_1.fastifySwagger, {
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
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
app.register(swagger_ui_1.default, {
    routePrefix: "/docs",
    uiConfig: {
        docExpansion: "none",
        deepLinking: false,
    },
});
app.register(auth_routes_1.authRoutes, { prefix: "/auth" });
app.register(user_routes_1.userRoutes, { prefix: "/users" });
app.register(qualification_routes_1.qualificationRoutes, { prefix: "/qualifications" });
app.register(student_routes_1.studentRoutes, { prefix: "/students" });
app.register(teacher_routes_1.teacherRoutes, { prefix: "/teachers" });
app.register(events_route_1.eventRoutes, { prefix: "/events" });
app.register(articles_routes_1.articleRoutes, { prefix: "/articles" });
app.register(job_vacancies_routes_1.jobVacanciesRoutes, { prefix: "/job-vacancies" });
app.register(scholarship_routes_1.scholarshipRoutes, { prefix: "/scholarships" });
app.register(level_route_1.levelRoutes, { prefix: "/levels" });
app.register(chapter_routes_1.chapterRoutes, { prefix: "/chapters" });
app.register(quizz_routes_1.quizzRoutes, { prefix: "/quizzes" });
app.register(quizz_item_routes_1.quizzItemRoutes, { prefix: "/quizz-items" });
app.register(module_routes_1.moduleRoutes, { prefix: "/modules" });
app.get("/health", async () => {
    return {
        status: "ok",
        time: new Date().toISOString(),
    };
});
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
    console.log(`Server running at port ${3333}`);
});
//# sourceMappingURL=server.js.map