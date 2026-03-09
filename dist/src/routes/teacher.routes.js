"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRoutes = teacherRoutes;
const teacher_controller_1 = require("../controllers/teacher.controller");
async function teacherRoutes(app) {
    app.post("/", { preHandler: app.authenticate }, teacher_controller_1.createTeacherHandler);
    app.get("/", { preHandler: app.authenticate }, teacher_controller_1.getTeachersHandler);
    app.get("/:id", { preHandler: app.authenticate }, teacher_controller_1.getTeacherByIdHandler);
    app.put("/:id", { preHandler: app.authenticate }, teacher_controller_1.updateTeacherHandler);
    app.delete("/:id", { preHandler: app.authenticate }, teacher_controller_1.deleteTeacherHandler);
}
//# sourceMappingURL=teacher.routes.js.map