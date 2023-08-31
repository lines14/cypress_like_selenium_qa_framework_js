const path = require('path');
const moment = require('moment');
const { createWriteStream } = require('fs');
const filePath = path.join(path.resolve(), 'cypress', 'test', 'log.txt');
const timeList = [];
const logList = [];

class Logger {
    log(step) {
        console.log(step);
        logList.push(` ${step}\n`);
        const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
        timeList.push(`${timeStamp}`);
        return timeStamp;
    }

    logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const stream = createWriteStream(filePath);
        stream.once('open', () => {
            summaryList.forEach((element) => element.forEach((elem) => stream.write(elem)));
            stream.end();
        });
    }

    async getTimings() {
        return [...timeList];
    }
}

module.exports = new Logger();