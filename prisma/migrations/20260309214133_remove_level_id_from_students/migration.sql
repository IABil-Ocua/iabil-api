/*
  Warnings:

  - You are about to drop the column `levelId` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_levelId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "levelId";

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_current_level_id_fkey" FOREIGN KEY ("current_level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
