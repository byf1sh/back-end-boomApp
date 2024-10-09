const prisma = require('../config/database');
const logger = require('../utils/logger');

exports.fetchAvailBoats = async (dateTime) => {
    try {
        let desiredDateTime = new Date(dateTime);
        const availableBoats = await prisma.boat.findMany({
            where: {
                reservations: {
                    none: {
                        rsv_datetime: desiredDateTime,
                    },
                },
            },
            include: {
                reservations: true,
            },
        });

        return availableBoats;
    } catch (e) {
        console.error('Error in boatService.getAvailableBoats:', error);
        throw new Error('Could not fetch available boats');
    }
};