const moment = require('moment');
const JSONLoader = require('../data/JSONLoader');

class TimeUtils {
  static getDatesInterval(count, unitOfTime, dateBegin) {
    const startDate = moment().add(1, 'days').format(JSONLoader.testData.datesFormat);
    const finishDate = dateBegin
      ? moment(dateBegin, JSONLoader.testData.datesFormat).add(count, unitOfTime)
        .subtract(1, 'days').format(JSONLoader.testData.datesFormat)
      : moment().add(count, unitOfTime).format(JSONLoader.testData.datesFormat);
    return { startDate: dateBegin ?? startDate, finishDate };
  }
}

module.exports = TimeUtils;
