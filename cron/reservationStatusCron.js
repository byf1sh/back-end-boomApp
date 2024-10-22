const cron = require('node-cron');
const prisma = require('../config/database');
const { DateTime } = require('luxon');
const {utcHelper, utcHelperPlus} = require('../utils/utcHelper');

const checkAndUpdateReservations = async () => {
  console.log('Memeriksa reservasi yang harus diupdate statusnya...');
  const datetime = DateTime.now().setZone('utc').plus({ hours: 7 });

  try {
    const updatedReservations = await prisma.reservation.updateMany({
      where: {
        rsv_datetime_end: {
          lt: datetime // Jika waktu sekarang lebih besar dari rsv_datetime_end
        },
        status: "On Going" // Hanya update status yang masih "On Going"
      },
      data: {
        status: "Completed"
      }
    });
    console.log(`Status diupdate pada ${datetime}`);
    console.log(`Status diupdate untuk ${updatedReservations.count} reservasi.`);
  } catch (error) {
    console.error('Gagal memperbarui status reservasi:', error);
  }
};

cron.schedule('* * * * *', checkAndUpdateReservations);

checkAndUpdateReservations();
