const { handleError } = require('../../utils/errorHandler');
const FetchAvailableBoatService = require('../../services/FetchAvailableBoatService');

exports.fetchAvailBoats = async (req,res) => {
    try{
        const {dateTime} = req.body;

        if (!dateTime) {
            return res.status(400).json({ error: 'Missing dateTime parameter' });
        }

        const availableBoats = await FetchAvailableBoatService.fetchAvailBoats(dateTime);

        res.json(availableBoats);
    } catch(e) {
        console.error('Error fetching available boats:', e);
        handleError(e,res);
    }
};