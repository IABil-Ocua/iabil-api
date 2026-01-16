/*
  Warnings:

  - The values [SUPER_ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `authorId` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `certifications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `qualifications` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `qualifications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `scholarships` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `scholarships` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `scholarships` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `scholarships` table. All the data in the column will be lost.
  - You are about to drop the column `approvalStatus` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `job-vacancies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `qualifications_levels` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_id` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `qualifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `scholarships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification_name` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'STUDENT', 'GRADUETE', 'TEACHER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_createdById_fkey";

-- DropForeignKey
ALTER TABLE "qualifications_levels" DROP CONSTRAINT "qualifications_levels_qualificationId_fkey";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "isFeatured",
DROP COLUMN "publishedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "certifications" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "endDate",
DROP COLUMN "imageUrl",
DROP COLUMN "isPublished",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "qualifications" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "scholarships" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "approvalStatus",
DROP COLUMN "qualification",
ADD COLUMN     "approval_status" "StudentApprovalStatus" NOT NULL DEFAULT 'NOT_APPROVED',
ADD COLUMN     "qualification_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "qualification_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "job-vacancies";

-- DropTable
DROP TABLE "qualifications_levels";

-- CreateTable
CREATE TABLE "levels" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notice_url" TEXT,
    "qualification_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "supplementary_material_url_1" TEXT NOT NULL,
    "supplementary_material_url_2" TEXT NOT NULL,
    "level_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizz_items" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option1" TEXT NOT NULL,
    "option2" TEXT NOT NULL,
    "option3" TEXT,
    "option4" TEXT,
    "answer" TEXT NOT NULL,
    "quizz_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizz_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_vacancies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_name_key" ON "quizzes"("name");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "qualifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_qualification_id_fkey" FOREIGN KEY ("qualification_id") REFERENCES "qualifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizz_items" ADD CONSTRAINT "quizz_items_quizz_id_fkey" FOREIGN KEY ("quizz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
