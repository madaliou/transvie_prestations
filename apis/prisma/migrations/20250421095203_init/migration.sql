/*
  Warnings:

  - Added the required column `paysId` to the `Agence` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Agence` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Agence` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Agence` ADD COLUMN `paysId` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Pays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agence` ADD CONSTRAINT `Agence_paysId_fkey` FOREIGN KEY (`paysId`) REFERENCES `Pays`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
