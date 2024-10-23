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

exports.statusReservation = async (action, rsv_id, newEndDate) => {
    try {
        const reservation = await prisma.reservation.findUnique({
            where: {
                rsv_id: rsv_id,
            },
        });
        if (!reservation) {
            throw new Error('Reservation not found');
        }
        let updatedData = {};
        if (action === 'reschedule') {
            const rsv_datetime = new Date(newEndDate);
            const rsv_datetime_end = new Date(rsv_datetime);
            rsv_datetime_end.setHours(rsv_datetime_end.getHours() + 1);
            updatedData = {
                status: 'Reschedule',
                rsv_datetime: rsv_datetime, // Update dengan tanggal akhir yang baru (jika diperlukan)
                rsv_datetime_end: rsv_datetime_end, // Update dengan tanggal akhir yang baru (jika diperlukan)
            };
        } else if (action === 'cancel') {
            updatedData = {
                status: 'Canceled',
                rsv_datetime_end: DateTime.now().setZone('utc').plus({ hours: 7 }), // Mengubah waktu akhir menjadi waktu saat ini
            };
        } else {
            throw new Error('Invalid action');
        }
        const updatedReservation = await prisma.reservation.update({
            where: {
                rsv_id: reservation.rsv_id,
            },
            data: updatedData,
        });
        return updatedReservation; // Kembalikan data reservasi yang sudah diperbarui
    } catch (e) {
        throw new Error('Could not update reservation: ' + e.message);
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