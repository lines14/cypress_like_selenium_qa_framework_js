const moment = require('moment');
const JSONLoader = require('../data/JSONLoader');

class TimeUtils {
  static getDatesInterval(count, unitOfTime, options = {}) {
    const dateBegin = options.dateBegin ?? null;
    const isIncluded = options.isIncluded ?? true;
    const startNextDay = options.startNextDay ?? true;
    const reverseInterval = options.reverseInterval ?? false;

    let startDate = startNextDay ? moment().add(1, 'days') : moment();

    let finishDate;
    if (reverseInterval) {
      finishDate = dateBegin
        ? moment(dateBegin, JSONLoader.testData.datesFormat).subtract(count, unitOfTime)
        : startDate.subtract(count, unitOfTime);
      if (isIncluded) {
        finishDate = finishDate.add(1, 'days');
      }
    } else {
      finishDate = dateBegin
        ? moment(dateBegin, JSONLoader.testData.datesFormat).add(count, unitOfTime)
        : startDate.add(count, unitOfTime);
      if (isIncluded) {
        finishDate = finishDate.subtract(1, 'days');
      }
    }

    startDate = startDate.format(JSONLoader.testData.datesFormat);
    finishDate = finishDate.format(JSONLoader.testData.datesFormat);
    return { startDate: dateBegin ?? startDate, finishDate };
  }
}

module.exports = TimeUtils;
