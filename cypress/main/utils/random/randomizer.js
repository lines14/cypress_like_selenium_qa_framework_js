class Randomizer {
    getRandomElementByText(baseElements, exceptionsList) {
        const baseElementsList = baseElements.slice(0, baseElements.length);
        let element;
        if (exceptionsList.length > 0) {
            do {
                element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
            } while ((exceptionsList.map((elem) => elem)).includes(element) && (element === ''));
        } else {
            do {
                element = baseElementsList[Math.floor(Math.random() * baseElementsList.length)];
            } while ((element === ''));
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

    incrementMonth(str) {
        const evenEndMonth = ['4', '6', '9', '11'];
        let updatedMonth;
        if (str.includes('/')) {
            let arr = str.split('/');
            if (arr[0] < '12') {
                let month = arr.shift();
                updatedMonth = (++month).toString();
            } else {
                arr.shift();
                updatedMonth = '1';
                let year = arr.pop();
                arr.push((++year).toString());
            }
    
            arr.unshift(updatedMonth);
            if (evenEndMonth.includes(updatedMonth) && arr[1] > 30) arr[1] = 30;
            if ((updatedMonth === 2) && arr[1] > 28) arr[1] = 28;
            return arr.join('/');
        } else {
            let arr = str.split('-');
            if (arr[1] < '12') {
                let month = arr[1];
                updatedMonth = (++month).toString();
                if (updatedMonth.length === 1) updatedMonth = '0' + updatedMonth;
            } else {
                updatedMonth = '01';
                let year = arr.shift();
                arr.unshift((++year).toString());
            }
    
            arr[1] = updatedMonth;
            if (evenEndMonth.includes(updatedMonth) && arr[2] > 30) arr[2] = 30;
            if ((updatedMonth === 2) && arr[2] > 28) arr[2] = 28;
            return arr.join('-');
        }
    }

    incrementTwoMonth(str) {
        const evenEndMonth = ['4', '6', '9', '11'];
        let updatedMonth;
        if (str.includes('/')) {
            let arr = str.split('/');
            if (arr[0] < '11') {
                let month = arr.shift();
                updatedMonth = ++month;
                updatedMonth = (++updatedMonth).toString();
            } else if (arr[0] === '11') {
                arr.shift();
                updatedMonth = '1';
                let year = arr.pop();
                arr.push((++year).toString());
            } else {
                arr.shift();
                updatedMonth = '2';
                let year = arr.pop();
                arr.push((++year).toString());
            }
    
            arr.unshift(updatedMonth);
            if (evenEndMonth.includes(updatedMonth) && arr[1] > 30) arr[1] = 30;
            if ((updatedMonth === 2) && arr[1] > 28) arr[1] = 28;
            return arr.join('/');
        } else {
            let arr = str.split('-');
            if (arr[1] < '11') {
                let month = arr[1];
                updatedMonth = ++month;
                updatedMonth = (++updatedMonth).toString();
                if (updatedMonth.length === 1) updatedMonth = '0' + updatedMonth;

            } else if (arr[1] === '11') {
                updatedMonth = '01';
                let year = arr.shift();
                arr.unshift((++year).toString());
            } else {
                updatedMonth = '02';
                let year = arr.shift();
                arr.unshift((++year).toString());
            }
    
            arr[1] = updatedMonth;
            if (evenEndMonth.includes(updatedMonth) && arr[2] > 30) arr[2] = 30;
            if ((updatedMonth === 2) && arr[2] > 28) arr[2] = 28;
            return arr.join('-');
        }
    }

    getRandomDatesInterval(dateOne, dateTwo) {
        const firstDate = dateOne || new Date().toLocaleDateString();
        const secondDate = dateTwo || (dateOne ? this.incrementMonth(dateOne) : this.incrementMonth(new Date().toLocaleDateString()));

        const unixOne = new Date(firstDate).getTime();
        const unixTwo = new Date(secondDate).getTime();

        const startDateUnix = new Date(this.getRandomFloat(unixOne, unixTwo)).getTime();
        let finishDateUnix;
        do {
            finishDateUnix = new Date(this.getRandomFloat(startDateUnix, unixTwo)).getTime();
        } while ((finishDateUnix - startDateUnix) < 86400000 * 2);

        const startDateArr = new Date(startDateUnix).toLocaleDateString().split('/');
        const finishDateArr = new Date(finishDateUnix).toLocaleDateString().split('/');

        const formattedStartDateArr = startDateArr.map((elem) => {
            return elem.length === 1 ? '0' + elem : elem;
        });
        const formattedFinishDateArr = finishDateArr.map((elem) => {
            return elem.length === 1 ? '0' + elem : elem;
        });

        let temp = formattedStartDateArr[0];
        formattedStartDateArr[0] = formattedStartDateArr[1];
        formattedStartDateArr[1] = temp;
        temp = formattedFinishDateArr[0];
        formattedFinishDateArr[0] = formattedFinishDateArr[1];
        formattedFinishDateArr[1] = temp;
        
        return { startDate: formattedStartDateArr.reverse().join('-'), finishDate: formattedFinishDateArr.reverse().join('-') }
    }
}

module.exports = new Randomizer();