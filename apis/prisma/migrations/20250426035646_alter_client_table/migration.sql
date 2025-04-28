/*
  Warnings:

  - Added the required column `agenceId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Prestation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `agenceId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Prestation` DROP FOREIGN KEY `Prestation_userId_fkey`;

-- DropIndex
DROP INDEX `Prestation_userId_fkey` ON `Prestation`;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `agenceId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Prestation` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `agenceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_agenceId_fkey` FOREIGN KEY (`agenceId`) REFERENCES `Agence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_agenceId_fkey` FOREIGN KEY (`agenceId`) REFERENCES `Agence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
