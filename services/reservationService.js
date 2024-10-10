const prisma = require('../config/database');
const logger = require('../utils/logger');
const { DateTime } = require('luxon');
const {utcHelper, utcHelperPlus} = require('../utils/utcHelper');

exports.createReservation = async (user_id, boat_id, rsv_date, rsv_time, number_of_people) => {
    try {
        let reservationDateTime = DateTime.fromISO(`${rsv_date}T${rsv_time}`, { zone: 'Asia/Jakarta' });
        reservationDateTime = reservationDateTime.set({ second: 0, millisecond: 0 });
        const oneHourLater = reservationDateTime.plus({ hours: 1 });
        return await prisma.reservation.create({
            data: {
                user_id,
                boat_id,
                rsv_datetime: reservationDateTime.toJSDate(),  // Simpan sebagai `DateTime` tanpa detik dan milidetik
                rsv_datetime_end: oneHourLater.toJSDate(),  // Simpan sebagai `DateTime` tanpa detik dan milidetik
                number_of_people,
            },
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.cancelReservation = async (rsv_id) => {
    try{

        const reservation = await prisma.reservation.findUnique({
            where: {
                rsv_id: rsv_id,
            },
        });

        if (!reservation) {
            throw new Error('Reservation not found');
        }
        let canceledDate = utcHelperPlus();

        const canceledReservation = await prisma.cancel_Reservation.create({
            data: {
                boat_id: reservation.boat_id,
                user_id: reservation.user_id,
                rsv_id: reservation.rsv_id,
                rsv_datetime: reservation.rsv_datetime,
                rsv_datetime_end: reservation.rsv_datetime_end,
                number_of_people: reservation.number_of_people,
                canceled_at: canceledDate,
            },
        }); 

        return await prisma.reservation.delete({
            where: {
                rsv_id: reservation.rsv_id,
            },
        });


    } catch (e) {
        throw new Error('Could not cancel reservation');
    }
};

