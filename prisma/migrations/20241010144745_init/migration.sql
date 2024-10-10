-- CreateTable
CREATE TABLE `Cancel_Reservation` (
    `cancel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `boat_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rsv_id` INTEGER NOT NULL,
    `rsv_datetime` DATETIME(3) NOT NULL,
    `rsv_datetime_end` DATETIME(3) NOT NULL,
    `number_of_people` INTEGER NOT NULL,
    `canceled_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cancel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cancel_Reservation` ADD CONSTRAINT `Cancel_Reservation_boat_id_fkey` FOREIGN KEY (`boat_id`) REFERENCES `Boat`(`boat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancel_Reservation` ADD CONSTRAINT `Cancel_Reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
