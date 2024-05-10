const moment = require('moment');
const JSONLoader = require('../data/JSONLoader');

class TimeUtils {
  static getDatesInterval(count, unitOfTime, dateBegin, options = { isIncluded: true }) {
    const startDate = moment().format(JSONLoader.testData.datesFormat);
    let finishDate = dateBegin
      ? moment(dateBegin, JSONLoader.testData.datesFormat).add(count, unitOfTime)
      : moment().add(count, unitOfTime);
    if (options.isIncluded) {
      finishDate = finishDate.subtract(1, 'days');
    }

    finishDate = finishDate.format(JSONLoader.testData.datesFormat);
    return { startDate: dateBegin ?? startDate, finishDate };
  }
}

module.exports = TimeUtils;
