/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userUser_id_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `userUser_id`,
    ADD COLUMN `addedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
