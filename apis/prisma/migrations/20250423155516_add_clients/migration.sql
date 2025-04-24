/*
  Warnings:

  - Added the required column `clientId` to the `Prestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthFacilityTypeId` to the `Prestation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Prestation` ADD COLUMN `clientId` INTEGER NOT NULL,
    ADD COLUMN `healthFacilityTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_healthFacilityTypeId_fkey` FOREIGN KEY (`healthFacilityTypeId`) REFERENCES `HealthFacilityType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
