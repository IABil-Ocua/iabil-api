import cron from "node-cron";
import { prisma } from "../lib/db";

export function startKeepAliveJob() {
  cron.schedule("* * * * *", async () => {
    try {
      const count = await prisma.qualification.count();

      console.log(
        `[KEEP-ALIVE] ${new Date().toISOString()} - qualifications: ${count}`,
      );
    } catch (error) {
      console.error("[KEEP-ALIVE ERROR]", error);
    }
  });
}
