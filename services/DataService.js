const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/indonesia', 'DetailBooking.json');

exports.getDetailBookingData = (callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    const detailBookingData = JSON.parse(data);
    callback(null, detailBookingData);
  });
};

exports.editDetailBookingData = (updatedData, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return callback(null, { message: 'Tidak ada data yang diubah.' });
    }
    let detailBookingData = JSON.parse(data); // Parsing JSON menjadi objek JavaScript
    let bookingDetail = detailBookingData[0]; // Asumsi data pertama
    let isUpdated = false; // Flag untuk mendeteksi perubahan
    for (const key in updatedData) {
      if (bookingDetail.hasOwnProperty(key)) {
        bookingDetail[key] = updatedData[key]; // Update nilai dari key yang ada
        isUpdated = true; // Set flag jika ada perubahan
      }
    }
    if (!isUpdated) {
      return callback(null, { message: 'Tidak ada data yang diubah.' });
    }
    fs.writeFile(filePath, JSON.stringify(detailBookingData, null, 2), (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, bookingDetail); // Return data yang sudah di-update
    });
  });
};
