/*
  Warnings:

  - Added the required column `locationName` to the `class_term_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class_term_details" ADD COLUMN     "locationName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "location" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "class_term_details" ADD CONSTRAINT "class_term_details_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "location"("name") ON DELETE CASCADE ON UPDATE CASCADE;
