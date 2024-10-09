const prisma = require('../config/database');
const logger = require('../utils/logger');
const { DateTime } = require('luxon');

exports.createReservation = async (user_id, boat_id, rsv_date, rsv_time, number_of_people) => {
    try {
        // Gabungkan tanggal dan waktu dengan zona waktu lokal Asia/Jakarta
        let reservationDateTime = DateTime.fromISO(`${rsv_date}T${rsv_time}`, { zone: 'Asia/Jakarta' });
        
        // Hilangkan detik dan milidetik (set detik dan milidetik menjadi nol)
        reservationDateTime = reservationDateTime.set({ second: 0, millisecond: 0 });
        logger(reservationDateTime);
        // Simpan ke database tanpa detik dan milidetik
        return await prisma.reservation.create({
            data: {
                user_id,
                boat_id,
                rsv_datetime: reservationDateTime.toJSDate(),  // Simpan sebagai `DateTime` tanpa detik dan milidetik
                number_of_people,
            },
        });
    } catch (e) {
        throw new Error(e.message);
    }
};

