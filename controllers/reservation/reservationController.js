const { handleError } = require('../../utils/errorHandler');
const CreateReservationService = require('../../services/reservationService');
const logger = require('../../utils/logger');
const { utcHelper } = require('../../utils/utcHelper');

exports.createReservation = async (req, res) => {
    const { user_id, boat_id, rsv_date, rsv_time, number_of_people } = req.body;

    try {
        logger(rsv_time);
        //if develop to prod check this, utcHelper may not needed anymore
        const adjustedTime = utcHelper(rsv_time);
        const reservation = await CreateReservationService.createReservation(user_id, boat_id, rsv_date, adjustedTime, number_of_people);
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch(e) {
        handleError(e, res);
    }
};
