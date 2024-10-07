-- CreateTable
CREATE TABLE `Boat` (
    `boat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `boat_name` VARCHAR(255) NOT NULL,
    `capacity` INTEGER NOT NULL,

    PRIMARY KEY (`boat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `rsv_id` INTEGER NOT NULL AUTO_INCREMENT,
    `boat_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rsv_date` DATE NOT NULL,
    `rsv_time` TIME(6) NOT NULL,
    `number_of_people` INTEGER NOT NULL,

    PRIMARY KEY (`rsv_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_boat_id_fkey` FOREIGN KEY (`boat_id`) REFERENCES `Boat`(`boat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
