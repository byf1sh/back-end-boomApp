const prisma = require('../config/database');
const logger = require('../utils/logger');
const { DateTime } = require('luxon');
const {utcHelper, utcHelperPlus} = require('../utils/utcHelper');

exports.createReservation = async (user_id, boat_id, rsv_date, rsv_time, number_of_people, payment_method, gender, phone, city) => {
    try {
        // 1. Ambil data user berdasarkan user_id
        const user = await prisma.user.findUnique({
            where: { id: user_id },
        });

        // 2. Cek apakah `phone` dan `city` null
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

        // 3. Konversi tanggal dan waktu reservasi
        let reservationDateTime = DateTime.fromISO(`${rsv_date}T${rsv_time}`, { zone: 'Asia/Jakarta' });
        reservationDateTime = reservationDateTime.set({ second: 0, millisecond: 0 });
        const oneHourLater = reservationDateTime.plus({ hours: 1 });

        // 4. Buat reservasi
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
                payment_method: reservation.payment_method,
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

