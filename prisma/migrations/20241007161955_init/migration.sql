/*
  Warnings:

  - You are about to drop the column `rsv_date` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `rsv_time` on the `reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `rsv_date`,
    DROP COLUMN `rsv_time`,
    ADD COLUMN `rsv_datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
