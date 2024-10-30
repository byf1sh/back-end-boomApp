const DetailBookingService = require('../../services/DataService');

// Mengambil semua data kamar
exports.getDetailBookingData = (req, res) => {
    DetailBookingService.getDetailBookingData((err, rooms) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load room data' });
    }
    res.json(rooms);
  });
};

exports.editDetailBookingData = (req, res) => {
  const targetPage = req.query.targetPage; // Data yang dikirimkan dari request body
  const updatedData = req.body; // Data yang dikirimkan dari request body
  DetailBookingService.editDetailBookingData(updatedData, targetPage, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(data); // Kirim kembali data yang sudah di-update
  });
};