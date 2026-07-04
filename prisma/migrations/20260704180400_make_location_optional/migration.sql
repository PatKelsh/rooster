-- DropForeignKey
ALTER TABLE "class_term_details" DROP CONSTRAINT "class_term_details_locationId_fkey";

-- AddForeignKey
ALTER TABLE "class_term_details" ADD CONSTRAINT "class_term_details_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
