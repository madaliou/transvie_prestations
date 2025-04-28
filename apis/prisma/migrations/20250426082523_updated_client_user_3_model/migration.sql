-- DropForeignKey
ALTER TABLE `Prestation` DROP FOREIGN KEY `Prestation_userId_fkey`;

-- DropIndex
DROP INDEX `Prestation_userId_fkey` ON `Prestation`;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
