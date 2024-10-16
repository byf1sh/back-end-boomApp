-- AlterTable
ALTER TABLE `cancel_reservation` ADD COLUMN `payment_method` VARCHAR(191) NOT NULL DEFAULT 'Transfer';
