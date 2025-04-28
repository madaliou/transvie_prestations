-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_userId_fkey`;

-- DropIndex
DROP INDEX `Client_userId_fkey` ON `Client`;
