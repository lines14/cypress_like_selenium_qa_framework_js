const moment = require('moment');
const JSONLoader = require('../data/JSONLoader');

class TimeUtils {
  static getDatesInterval(count, unitOfTime, options = {}) {
    const dateBegin = options.dateBegin || null;
    const isIncluded = options.isIncluded || true;
    const startNextDay = options.startNextDay || true;
    const reverseInterval = options.reverseInterval || false;

    const startDate = startNextDay
      ? moment().add(1, 'days').format(JSONLoader.testData.datesFormat)
      : moment().format(JSONLoader.testData.datesFormat);

    let finishDate;
    if (reverseInterval) {
      finishDate = dateBegin
        ? moment(dateBegin, JSONLoader.testData.datesFormat).subtract(count, unitOfTime)
        : moment().subtract(count, unitOfTime);
      if (isIncluded) {
        finishDate = finishDate.add(1, 'days');
      }
    } else {
      finishDate = dateBegin
        ? moment(dateBegin, JSONLoader.testData.datesFormat).add(count, unitOfTime)
        : moment().add(count, unitOfTime);
      if (isIncluded) {
        finishDate = finishDate.subtract(1, 'days');
      }
    }

    finishDate = finishDate.format(JSONLoader.testData.datesFormat);
    return { startDate: dateBegin ?? startDate, finishDate };
  }
}

module.exports = TimeUtils;
