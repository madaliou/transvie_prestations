/*
  Warnings:

  - You are about to drop the column `paysId` on the `Agence` table. All the data in the column will be lost.
  - You are about to drop the `Pays` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `Agence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Agence` DROP FOREIGN KEY `Agence_paysId_fkey`;

-- DropIndex
DROP INDEX `Agence_paysId_fkey` ON `Agence`;

-- AlterTable
ALTER TABLE `Agence` DROP COLUMN `paysId`,
    ADD COLUMN `countryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Pays`;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agence` ADD CONSTRAINT `Agence_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
