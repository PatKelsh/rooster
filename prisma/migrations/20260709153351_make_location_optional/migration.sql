-- DropForeignKey
ALTER TABLE "class_term_details" DROP CONSTRAINT "class_term_details_locationId_fkey";

-- AlterTable
ALTER TABLE "class_term_details" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "class_term_details" ADD CONSTRAINT "class_term_details_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
