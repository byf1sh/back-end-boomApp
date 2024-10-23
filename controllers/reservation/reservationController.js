const { handleError } = require('../../utils/errorHandler');
const reservationReservationService = require('../../services/reservationService');
const reviewService = require('../../services/ReviewService');
const logger = require('../../utils/logger');
const { utcHelper } = require('../../utils/utcHelper');

exports.createReservation = async (req, res) => {
    const { user_id, boat_id, rsv_date, rsv_time, number_of_people, payment_method, gender, phone, city } = req.body;

    try {
        const reservation = await reservationReservationService.createReservation(user_id, boat_id, rsv_date, rsv_time, number_of_people, payment_method, gender, phone, city);
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch(e) {
        handleError(e, res);
    }
};

exports.statusReservation = async (req, res) => {
    const action = req.query.action;
    const { rsv_id, newDate } = req.body;
    try {
        const updatedReservation = await reservationReservationService.statusReservation(action, rsv_id, newDate);
        let message;
        if (action === 'cancel') {
            message = 'Reservation canceled successfully';
        } else if (action === 'reschedule') {
            message = 'Reservation rescheduled successfully';
        } else {
            message = 'Action performed successfully';
        }
        res.status(201).json({ message, updatedReservation });
    } catch (e) {
        handleError(e, res);
    }
};

exports.getUserReservations = async (req, res) => {
    const user_id = parseInt(req.query.user_id); // Ambil user_id dari query params
    try {
        const reservations = await reservationReservationService.getReservationsByUserId(user_id);
        for (let reservation of reservations) {
            if (reservation.status === 'Completed') {
                const review = await reviewService.getReviewsByBoatId(reservation.rsv_id, reservation.user_id);
                reservation.review = review;
            }
        }
        res.json(reservations);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to fetch reservations data' });
    }
};


