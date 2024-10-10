const express = require('express');
const reservationController = require('../controllers/reservation/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-reservation', authMiddleware, reservationController.createReservation);
router.post('/cancel-reservation', authMiddleware, reservationController.cancelReservation);

module.exports = router;
