-- AlterEnum
ALTER TYPE "StudentApprovalStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "approval_status" SET DEFAULT 'PENDING';
