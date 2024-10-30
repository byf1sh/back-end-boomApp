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

exports.editDetailBookingData = (updatedData, targetPage, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return callback(null, { message: 'Tidak ada data yang diubah.' });
    }

    let detailBookingData = JSON.parse(data); // Parsing JSON menjadi objek JavaScript
    let bookingDetail = detailBookingData.find(item => item[targetPage]); // Mencari objek yang sesuai dengan targetPage

    if (!bookingDetail) {
      return callback(null, { message: `Tidak ditemukan data untuk halaman ${targetPage}.` });
    }

    let isUpdated = false; // Flag untuk mendeteksi perubahan

    // Update nilai di dalam page yang dipilih
    for (const key in updatedData) {
      if (bookingDetail[targetPage].hasOwnProperty(key)) {
        bookingDetail[targetPage][key] = updatedData[key]; // Update nilai dari key yang ada
        isUpdated = true; // Set flag jika ada perubahan
      }
    }

    if (!isUpdated) {
      return callback(null, { message: 'Tidak ada data yang diubah.' });
    }

    // Tulis kembali ke file setelah update
    fs.writeFile(filePath, JSON.stringify(detailBookingData, null, 2), (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, bookingDetail[targetPage]); // Return data yang sudah di-update
    });
  });
};

