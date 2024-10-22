const express = require('express');
const dataController = require('../controllers/data/DataController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route untuk mendapatkan semua data kamar
router.get('/get-DetailBookingData', authMiddleware, dataController.getDetailBookingData);
router.post('/edit-DetailBookingData', authMiddleware, dataController.editDetailBookingData);

module.exports = router;
