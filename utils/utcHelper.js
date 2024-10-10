const { DateTime } = require('luxon');

exports.utcHelper = (time) => {
    let [hours, minutes, seconds] = time.split(':');
    hours = parseInt(hours) + 7;
    if (hours >= 24) {
        hours = hours - 24;
    }
    let adjustedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;

    return adjustedTime;
};

exports.utcHelperPlus = () =>  {
    let canceledDate = DateTime.now().toUTC();
    const a = canceledDate.plus({ hours:7 });
    return a.toISO();
};