/*
  Warnings:

  - You are about to drop the column `status` on the `articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "status",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "ArticleStatus";
