/*
  Warnings:

  - Made the column `url_foto` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `news` MODIFY `url_foto` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL;
