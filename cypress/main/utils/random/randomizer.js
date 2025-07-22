/* eslint-disable no-unused-expressions */
const moment = require('moment');
const JSONLoader = require('../data/JSONLoader');

class Randomizer {
  static getRandomDatesIntervalFromTomorrow(count, unitOfTime, reverseInterval) {
    const reverse = reverseInterval ?? false;
    const nextDayObject = reverse
      ? moment().subtract(1, 'days').startOf('day')
      : moment().add(1, 'days').startOf('day');
    const unixOne = nextDayObject.unix();
    const unixTwo = reverse
      ? moment(moment().subtract(1, 'days').startOf('day')).subtract(count, unitOfTime).unix()
      : moment(moment().add(1, 'days').startOf('day')).add(count, unitOfTime).unix();

    const startDateUnix = moment.unix(this.getRandomFloat(unixOne, unixTwo)).unix();
    let finishDateUnix;
    if (reverse) {
      finishDateUnix = moment.unix(this.getRandomFloat(startDateUnix, unixTwo)).unix();
    } else {
      do {
        finishDateUnix = moment.unix(this.getRandomFloat(startDateUnix, unixTwo)).unix();
      } while ((finishDateUnix - startDateUnix) < 86400 * 2);
    }

    const startDateObject = moment.unix(startDateUnix).startOf('day');
    const finishDateObject = moment.unix(finishDateUnix).startOf('day');
    const startDate = startDateObject.format(JSONLoader.testData.datesFormatYMD);
    const finishDate = finishDateObject.format(JSONLoader.testData.datesFormatYMD);
    const startDateDMY = startDateObject.format(JSONLoader.testData.datesFormatDMY);
    const finishDateDMY = finishDateObject.format(JSONLoader.testData.datesFormatDMY);

    const daysDifferenceIncluded = finishDateObject.diff(startDateObject, 'days') + 1;

    const getAbsoluteMonth = (date) => {
      const months = Number(moment(date, JSONLoader.testData.datesFormatDMY).format('MM'));
      const years = Number(moment(date, JSONLoader.testData.datesFormatDMY).format('YYYY'));
      return months + (years * 12);
    };

    const currentMonth = getAbsoluteMonth(moment.unix(unixOne)
      .format(JSONLoader.testData.datesFormatDMY));
    const startMonth = getAbsoluteMonth(startDateDMY);
    const finishMonth = getAbsoluteMonth(finishDateDMY);
    let startMonthDifference = reverse ? currentMonth - startMonth : startMonth - currentMonth;
    let finishMonthDifference = reverse ? currentMonth - finishMonth : finishMonth - currentMonth;

    if (nextDayObject.date() === 1) {
      reverse ? startMonthDifference -= 1 : startMonthDifference += 1;
      reverse ? finishMonthDifference -= 1 : finishMonthDifference += 1;
    }

    return {
      startDate,
      finishDate,
      startMonthDifference,
      finishMonthDifference,
      daysDifferenceIncluded,
    };
  }

  static getRandomString(
    hasLowerCase = false,
    hasUpperCase = false,
    hasNumber = false,
    hasCyrillic = false,
    chosenLetter = false,
    minLength = 1,
    maxLength = 10,
  ) {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const cyrillicLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

    const length = this.getRandomInteger(maxLength, minLength);

    let randomString = '';
    if (chosenLetter) randomString += chosenLetter;

    let requiredCharacters = '';
    if (hasLowerCase) {
      requiredCharacters
      += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
    }

    if (hasUpperCase) {
      requiredCharacters
      += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
    }

    if (hasNumber) {
      requiredCharacters
      += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    if (hasCyrillic) {
      requiredCharacters
      += cyrillicLetters.charAt(Math.floor(Math.random() * cyrillicLetters.length));
    }

    randomString += requiredCharacters;

    const characters = (hasLowerCase ? lowerCaseLetters : '')
    + (hasUpperCase ? upperCaseLetters : '')
    + (hasNumber ? numbers : '')
    + (hasCyrillic ? cyrillicLetters : '');
    const charactersLength = characters.length;
    const randomLength = length - randomString.length;

    for (let i = 0; i < randomLength; i += 1) {
      randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return this.stringShuffler(randomString);
  }

  static stringShuffler(inputString) {
    const array = inputString.split('');
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array.join('');
  }

  static getRandomInteger(max = 9, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getRandomElementByText(baseElements, exceptionsList) {
    const baseElementsList = baseElements.slice(0, baseElements.length);
    let element;
    if (exceptionsList.length > 0) {
      while (true) { // eslint-disable-line no-constant-condition
        element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
        if (!exceptionsList.includes(element) && (element !== '')) break;
      }
    } else {
      while (true) { // eslint-disable-line no-constant-condition
        element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
        if (element !== '') break;
      }
    }

    return element;
  }

  static getRandomDateBetweenTwoDates(dateFrom, dateTo) {
    const daysDifference = moment(dateTo, JSONLoader.testData.datesFormatDMY)
      .diff(moment(dateFrom, JSONLoader.testData.datesFormatDMY), 'days');

    return moment(dateFrom, JSONLoader.testData.datesFormatDMY)
      .add(Randomizer.getRandomInteger(daysDifference), 'days');
  }

  static getRandomArrayElement(array) {
    return array[Randomizer.getRandomInteger(array.length - 1)];
  }
}

module.exports = Randomizer;
