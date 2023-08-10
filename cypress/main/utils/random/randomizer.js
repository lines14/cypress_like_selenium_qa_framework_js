const moment = require('moment');

class Randomizer {
    getRandomElementByText(baseElements, exceptionsList) {
        const baseElementsList = baseElements.slice(0, baseElements.length);
        let element;
        if (exceptionsList.length > 0) {
            while (true) {
                element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
                if (!exceptionsList.includes(element) && (element !== '')) break;
            }
        } else {
            while (true) {
                element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
                if (element !== '') break;
            }
        }
        
        return element;
    }

    getRandomString(hasLowerCase=false, hasUpperCase=false, hasNumber=false, hasCyrillic=false, chosenLetter=false, minLength=1, maxLength=10) {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const cyrillicLetters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
      
        let length = this.getRandomInteger(maxLength, minLength);
      
        let randomString = '';
        if (chosenLetter) randomString += chosenLetter;
      
        let requiredCharacters = '';
        if (hasLowerCase) requiredCharacters += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
        if (hasUpperCase) requiredCharacters += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
        if (hasNumber) requiredCharacters += numbers.charAt(Math.floor(Math.random() * numbers.length));
        if (hasCyrillic) requiredCharacters += cyrillicLetters.charAt(Math.floor(Math.random() * cyrillicLetters.length));

        randomString += requiredCharacters;
      
        const characters = (hasLowerCase ? lowerCaseLetters : '') + (hasUpperCase ? upperCaseLetters : '') + (hasNumber ? numbers : '') + (hasCyrillic ? cyrillicLetters : '');
        const charactersLength = characters.length;
        const randomLength = length - randomString.length;

        for (let i = 0; i < randomLength; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return this.stringShuffler(randomString);
    }

    stringShuffler(inputString) {
        let array = inputString.split('');
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array.join('');
    }

    getRandomInteger(max=9, min=0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomDatesIntervalFromTomorrow(months) {
        const unixOne = moment().add(1, 'days').unix();
        const unixTwo = moment(moment().add(1, 'days')).add(months, 'months').unix();

        const startDateUnix = moment.unix(this.getRandomFloat(unixOne, unixTwo)).unix();
        let finishDateUnix;
        do {
            finishDateUnix = moment.unix(this.getRandomFloat(startDateUnix, unixTwo)).unix();
        } while ((finishDateUnix - startDateUnix) < 86400 * 2);
        
        const startDate = moment.unix(startDateUnix).format('YYYY-MM-DD');
        const finishDate = moment.unix(finishDateUnix).format('YYYY-MM-DD');

        const getAbsoluteMonth = (date) => {
            const months = Number(moment(date).format("MM"));
            const years = Number(moment(date).format("YYYY"));
            return months + (years * 12);
        }

        const currentMonth = getAbsoluteMonth(moment().format('YYYY-MM-DD'));
        const startMonth = getAbsoluteMonth(startDate);
        const finishMonth = getAbsoluteMonth(finishDate);
        const startMonthDifference = startMonth - currentMonth;
        const finishMonthDifference = finishMonth - currentMonth;

        return { startDate: startDate, finishDate: finishDate, startMonthDifference: startMonthDifference, finishMonthDifference: finishMonthDifference }
    }
}

module.exports = new Randomizer();