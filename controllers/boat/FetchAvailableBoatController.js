const { handleError } = require('../../utils/errorHandler');
const FetchAvailableBoatService = require('../../services/FetchAvailableBoatService');
const logger = require('../../utils/logger');

exports.fetchAvailBoats = async (req, res) => {
    try {
        // Mengambil dateTime dari query string
        const { dateTime } = req.query;

        if (!dateTime) {
            return res.status(400).json({ error: 'Missing dateTime parameter' });
        }

        // Menggunakan service untuk mengambil boat yang tersedia
        const availableBoats = await FetchAvailableBoatService.fetchAvailBoats(dateTime);

        // Mengirimkan respons ke client
        res.json(availableBoats);
    } catch (e) {
        console.error('Error fetching available boats:', e);
        handleError(e, res);
    }
};
