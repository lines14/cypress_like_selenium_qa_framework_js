const path = require('path');
const moment = require('moment');
const { createWriteStream, appendFile } = require('fs');
const JSONLoader = require('../data/JSONLoader');
const filePath = path.join(path.resolve(), 'artifacts', 'log.txt');
const timeList = [];
const logList = [];

class Logger {
    static #title;

    static log(step, title) {
        logList.push(` ${step}`);
        const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
        timeList.push(`${timeStamp}`);
        if (title) this.#title = title;
        if (!JSONLoader.configData.parallel) {
            if (!title) appendFile(filePath, `${timeStamp} ${step}\n`, 'utf8');
            this.hideLogBodies(step);
        }

        return timeStamp;
    }

    static hideLogBodies(step) {
        if (JSONLoader.configData.hiddenLogBodies && step.includes('[req]')) {
            const words = step.split(' ');
            const firstPart = words.slice(0, 3).join(' ');
            const secondPart = words.slice(words.length - 2).join(' ');
            console.log(`    ${firstPart} ${secondPart}`);
        } else {
            console.log(`    ${step}`);
        }
    }

    static logParallel() {
        logList.forEach((step) => this.hideLogBodies(step.trim()));
    }

    static logToFileParallel() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        summaryList.shift();
        const fileName = filePath.split('/')
        .map((part, index, array) => index === array.length - 1 ? this.#title + '.' + part : part)
        .join('/');
        const stream = createWriteStream(fileName);
        stream.once('open', () => {
            summaryList.forEach((logString) => logString.forEach((logSubString, index) => {
                index % 2 !== 0 ? stream.write(`${logSubString}\n`) : stream.write(`${logSubString}`);
            }));
            stream.end();
        });
    }
}

module.exports = Logger;