const prisma = require('../config/database');

exports.createReservation = async (user_id, boat_id, rsv_date, rsv_time, number_of_people) => {
    try {
        // Gabungkan tanggal dan waktu menjadi DateTime
        const reservationDateTime = new Date(`${rsv_date}T${rsv_time}`);

        // Cek apakah sudah ada reservasi pada tanggal dan waktu yang sama
        const existingReservation = await prisma.reservation.findFirst({
            where: {
                boat_id: boat_id,
                rsv_datetime: reservationDateTime,
            },
        });

        if (existingReservation) {
            throw new Error('Boat is already reserved at this time');
        }

        // Jika tidak ada bentrok waktu, buat reservasi baru
        return await prisma.reservation.create({
            data: {
                user_id,
                boat_id,
                rsv_datetime: reservationDateTime,
                number_of_people,
            },
        });
    } catch (e) {
        throw new Error(e.message);
    }
};
