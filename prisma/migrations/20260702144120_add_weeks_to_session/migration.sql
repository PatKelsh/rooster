/*
  Warnings:

  - Added the required column `weeks` to the `term` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "term" ADD COLUMN     "weeks" INTEGER NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
