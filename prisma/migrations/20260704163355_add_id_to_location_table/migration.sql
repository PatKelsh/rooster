/*
  Warnings:

  - You are about to drop the column `locationName` on the `class_term_details` table. All the data in the column will be lost.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `locationId` to the `class_term_details` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `location` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "class_term_details" DROP CONSTRAINT "class_term_details_locationName_fkey";

-- AlterTable
ALTER TABLE "class_term_details" DROP COLUMN "locationName",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "location" DROP CONSTRAINT "location_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "location_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "class_term_details" ADD CONSTRAINT "class_term_details_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
