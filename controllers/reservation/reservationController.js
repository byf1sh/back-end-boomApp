const { handleError } = require('../../utils/errorHandler');
const reservationReservationService = require('../../services/reservationService');
const logger = require('../../utils/logger');
const { utcHelper } = require('../../utils/utcHelper');

exports.createReservation = async (req, res) => {
    const { user_id, boat_id, rsv_date, rsv_time, number_of_people } = req.body;

    try {
        //if develop to prod check this, utcHelper may not needed anymore
        const adjustedTime = utcHelper(rsv_time);
        const reservation = await reservationReservationService.createReservation(user_id, boat_id, rsv_date, adjustedTime, number_of_people);
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch(e) {
        handleError(e, res);
    }
};

exports.cancelReservation = async (req, res) => {
    const {rsv_id} = req.body;
    try{
        const cancel = await reservationReservationService.cancelReservation(rsv_id);
        res.status(201).json({ message: 'Reservation canceled successfully', cancel })
    } catch (e) {
        handleError(e,res);
    }
};
