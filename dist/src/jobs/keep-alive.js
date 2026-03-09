"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startKeepAliveJob = startKeepAliveJob;
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("../lib/db");
function startKeepAliveJob() {
    node_cron_1.default.schedule("* * * * *", async () => {
        try {
            const count = await db_1.prisma.qualification.count();
            console.log(`[KEEP-ALIVE] ${new Date().toISOString()} - qualifications: ${count}`);
        }
        catch (error) {
            console.error("[KEEP-ALIVE ERROR]", error);
        }
    });
}
//# sourceMappingURL=keep-alive.js.map