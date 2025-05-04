/*
  Warnings:

  - You are about to drop the column `agenceId` on the `Client` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_agenceId_fkey`;

-- DropIndex
DROP INDEX `Client_agenceId_fkey` ON `Client`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `agenceId`,
    ADD COLUMN `countryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
