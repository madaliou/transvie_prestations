/*
  Warnings:

  - You are about to drop the column `cost` on the `Prestation` table. All the data in the column will be lost.
  - Added the required column `agenceId` to the `Prestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cout` to the `Prestation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Prestation` DROP FOREIGN KEY `Prestation_userId_fkey`;

-- DropIndex
DROP INDEX `Prestation_userId_fkey` ON `Prestation`;

-- AlterTable
ALTER TABLE `Prestation` DROP COLUMN `cost`,
    ADD COLUMN `actId` INTEGER NULL,
    ADD COLUMN `agenceId` INTEGER NOT NULL,
    ADD COLUMN `cout` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `otherAct` VARCHAR(255) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `date` DATE NOT NULL,
    MODIFY `certificateNumber` VARCHAR(255) NULL,
    MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `firstname` VARCHAR(255) NOT NULL,
    MODIFY `lastname` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Agence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_agenceId_fkey` FOREIGN KEY (`agenceId`) REFERENCES `Agence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_actId_fkey` FOREIGN KEY (`actId`) REFERENCES `Subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
