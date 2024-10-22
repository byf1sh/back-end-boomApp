/*
  Warnings:

  - You are about to drop the `cancel_reservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cancel_reservation` DROP FOREIGN KEY `Cancel_Reservation_boat_id_fkey`;

-- DropForeignKey
ALTER TABLE `cancel_reservation` DROP FOREIGN KEY `Cancel_Reservation_user_id_fkey`;

-- DropTable
DROP TABLE `cancel_reservation`;
