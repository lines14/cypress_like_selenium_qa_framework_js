const moment = require('moment-timezone');
const JSONLoader = require('../data/JSONLoader');

class TimeUtils {
  static getDatesInterval(count, unitOfTime, options = {}) {
    const { dateBegin } = options;
    const startNextDay = options.startNextDay ?? true;
    const isNotIncluded = options.isNotIncluded ?? true;
    const reverseInterval = options.reverseInterval ?? false;

    let startDate;
    if (reverseInterval) {
      startDate = startNextDay ? moment().subtract(1, 'days') : moment();
    } else {
      startDate = startNextDay ? moment().add(1, 'days') : moment();
    }

    let finishDate;
    if (reverseInterval) {
      finishDate = dateBegin
        ? moment(dateBegin, JSONLoader.testData.datesFormatDMY).subtract(count, unitOfTime)
        : moment(startDate).subtract(count, unitOfTime);
      if (isNotIncluded) {
        finishDate = moment(finishDate).add(1, 'days');
      }
    } else {
      finishDate = dateBegin
        ? moment(dateBegin, JSONLoader.testData.datesFormatDMY).add(count, unitOfTime)
        : moment(startDate).add(count, unitOfTime);
      if (isNotIncluded) {
        finishDate = moment(finishDate).subtract(1, 'days');
      }
    }

    startDate = moment(startDate).format(JSONLoader.testData.datesFormatDMY);
    finishDate = moment(finishDate).format(JSONLoader.testData.datesFormatDMY);
    return reverseInterval
      ? { startDate: finishDate, finishDate: dateBegin ?? startDate }
      : { startDate: dateBegin ?? startDate, finishDate };
  }

  static reformatDateFromYMDToDMY(date) {
    return moment(date, JSONLoader.testData.datesFormatYMD)
      .format(JSONLoader.testData.datesFormatDMY);
  }

  static reformatDateFromDMYToYMD(date) {
    return moment(date, JSONLoader.testData.datesFormatDMY)
      .format(JSONLoader.testData.datesFormatYMD);
  }

  static getFirstAndLastDateOfPrevMonth({ monthsDelta } = {}) {
    const numberOfMonthsToSubtract = monthsDelta || 1;
    return {
      firstDay: moment().subtract(numberOfMonthsToSubtract, 'months').startOf('month'),
      lastDay: moment().subtract(numberOfMonthsToSubtract, 'months').endOf('month'),
    };
  }

  static toLocalTMZ(dateUTC) {
    return moment(dateUTC).tz('Asia/Almaty');
  }
}

module.exports = TimeUtils;
