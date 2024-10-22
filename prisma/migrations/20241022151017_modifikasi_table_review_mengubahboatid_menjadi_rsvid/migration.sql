/*
  Warnings:

  - You are about to drop the column `boat_id` on the `review` table. All the data in the column will be lost.
  - Added the required column `rsv_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_boat_id_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `boat_id`,
    ADD COLUMN `rsv_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_rsv_id_fkey` FOREIGN KEY (`rsv_id`) REFERENCES `Reservation`(`rsv_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
