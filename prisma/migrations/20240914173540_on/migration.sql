/*
  Warnings:

  - The values [APPROVED] on the enum `PaperStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaperStatus_new" AS ENUM ('PENDING', 'ONGOING', 'REJECTED', 'COMPLETED');
ALTER TABLE "Paper" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Paper" ALTER COLUMN "status" TYPE "PaperStatus_new" USING ("status"::text::"PaperStatus_new");
ALTER TYPE "PaperStatus" RENAME TO "PaperStatus_old";
ALTER TYPE "PaperStatus_new" RENAME TO "PaperStatus";
DROP TYPE "PaperStatus_old";
ALTER TABLE "Paper" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';
