const { DateTime } = require('luxon');
const prisma = require('../config/database');
const logger = require('../utils/logger');

exports.fetchAvailBoats = async (dateTime) => {
    try {
        let desiredDateTime = DateTime.fromISO(dateTime).toUTC(); // Tetap dalam UTC
        const oneHourLater = desiredDateTime.plus({ hours: 1 });
        const availableBoats = await prisma.boat.findMany({
            where: {
                reservations: {
                    none: {
                        AND: [
                            {
                                rsv_datetime: {
                                    lte: oneHourLater.toISO(), // rsv_datetime <= oneHourLater
                                },
                            },
                            {
                                rsv_datetime_end: {
                                    gte: desiredDateTime.toISO(), // rsv_datetime_end >= desiredDateTime
                                },
                            }
                        ],
                    },
                },
            },
            include: {
                reservations: true,
            },
        });

        return availableBoats;
    } catch (error) {
        console.error('Error in boatService.getAvailableBoats:', error);
        throw new Error('Could not fetch available boats');
    }
};
