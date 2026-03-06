import {
  createTeacherHandler,
  deleteTeacherHandler,
  getTeacherByIdHandler,
  getTeachersHandler,
  updateTeacherHandler,
} from "../controllers/teacher.controller";
import { FastifyTypedInstance } from "../types/zod";

export async function teacherRoutes(app: FastifyTypedInstance) {
  app.post("/", { preHandler: app.authenticate }, createTeacherHandler);
  app.get("/", { preHandler: app.authenticate }, getTeachersHandler);
  app.get("/:id", { preHandler: app.authenticate }, getTeacherByIdHandler);
  app.put("/:id", { preHandler: app.authenticate }, updateTeacherHandler);
  app.delete("/:id", { preHandler: app.authenticate }, deleteTeacherHandler);
}
