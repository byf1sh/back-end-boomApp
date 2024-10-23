const express = require('express');
const reservationController = require('../controllers/reservation/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-reservation', authMiddleware, reservationController.createReservation);
router.get('/reservation', authMiddleware, reservationController.getUserReservations);
router.post('/status-reservation', authMiddleware, reservationController.statusReservation);

module.exports = router;
