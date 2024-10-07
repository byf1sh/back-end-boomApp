const { handleError } = require('../../utils/errorHandler');
const CreateReservationService = require('../../services/reservationService');

exports.createReservation = async (req, res) => {
    const { user_id, boat_id, rsv_date, rsv_time, number_of_people } = req.body;

    try {
        const reservation = await CreateReservationService.createReservation(user_id, boat_id, rsv_date, rsv_time, number_of_people);
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch(e){
        handleError(e,res)
    }
};