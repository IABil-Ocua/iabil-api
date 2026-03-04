/*
  Warnings:

  - The values [GRADUETE] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `birth_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'STUDENT', 'TEACHER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "status",
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "birth_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birth_date",
DROP COLUMN "cover";
