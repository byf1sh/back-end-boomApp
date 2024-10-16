-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `paid` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `payment_method` VARCHAR(191) NOT NULL DEFAULT 'Transfer';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL;
