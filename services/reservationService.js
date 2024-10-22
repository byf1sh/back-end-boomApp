const prisma = require('../config/database');
const logger = require('../utils/logger');
const { DateTime } = require('luxon');
const {utcHelper, utcHelperPlus} = require('../utils/utcHelper');

exports.createReservation = async (user_id, boat_id, rsv_date, rsv_time, number_of_people, payment_method, gender, phone, city) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: user_id },
        });
        if (user.phone === null || user.city === null || user.gender === null) {
            console.log('null nih');
            await prisma.user.update({
                where: { id: user_id },
                data: {
                    gender: user.gender === null ? gender : user.gender, // Jika phone null, update dengan nilai baru
                    phone: user.phone === null ? phone : user.phone, // Jika phone null, update dengan nilai baru
                    city: user.city === null ? city : user.city,    // Jika city null, update dengan nilai baru
                },
            });
        }
        let reservationDateTime = DateTime.fromISO(`${rsv_date}T${rsv_time}`,{ zone: 'utc' });
        reservationDateTime = reservationDateTime.set({ second: 0, millisecond: 0 });
        const oneHourLater = reservationDateTime.plus({ hours: 1 });
        return await prisma.reservation.create({
            data: {
                user_id,
                boat_id,
                rsv_datetime: reservationDateTime.toJSDate(),  // Simpan sebagai `DateTime` tanpa detik dan milidetik
                rsv_datetime_end: oneHourLater.toJSDate(),  // Simpan sebagai `DateTime` tanpa detik dan milidetik
                number_of_people,
                payment_method,
            },
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.cancelReservation = async (rsv_id) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: {
                rsv_id: rsv_id,
            },
        });
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        const updatedReservation = await prisma.reservation.update({
            where: {
                rsv_id: reservation.rsv_id,
            },
            data: {
                status: 'Canceled',
                rsv_datetime_end: new Date(), // Optionally, you can update the end time if needed
            },
        });
        return updatedReservation; // Return data reservasi yang sudah diupdate
    } catch (e) {
        throw new Error('Could not cancel reservation');
    }
};

exports.getReservationsByUserId = async(user_id) => {
    try{
        const reservations = await prisma.reservation.findMany({
            where: {
                user_id: user_id,
            },
            include: {
                boat: true,
            },
        });
        return reservations;
        
    } catch (e) {
        throw new Error(e.message);
    }
};