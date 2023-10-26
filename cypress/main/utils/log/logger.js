const path = require('path');
const moment = require('moment');
const { createWriteStream } = require('fs');
const JSONLoader = require('../data/JSONLoader');
const filePath = path.join(path.resolve(), 'cypress', 'artifacts', 'log.txt');
const timeList = [];
const logList = [];

class Logger {
    static log(step) {
        logList.push(` ${step}\n`);
        const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
        timeList.push(`${timeStamp}`);
        if (JSONLoader.configData.hiddenLogBodies && step.includes('[req]')) {
            const words = step.split(' ');
            const firstPart = words.slice(0, 3).join(' ');
            const secondPart = words.slice(words.length - 2).join(' ');
            console.log(`${firstPart} ${secondPart}`);
        } else {
            console.log(step);
        }

        return timeStamp;
    }

    static logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const stream = createWriteStream(filePath);
        stream.once('open', () => {
            summaryList.forEach((element) => element.forEach((elem) => stream.write(elem)));
            stream.end();
        });
    }
}

module.exports = Logger;