const moment = require('moment');
const JSONLoader = require('../data/JSONLoader');

class TimeUtils {
    static getIntervalFromTomorrow(count, unitOfTime) {
        const startDate = moment().add(1, 'days')
        .format(JSONLoader.testData.datesFormat);
        const finishDate = moment().add(count, unitOfTime)
        .format(JSONLoader.testData.datesFormat);
        return { startDate: startDate, finishDate: finishDate }
    }
}

module.exports = TimeUtils;