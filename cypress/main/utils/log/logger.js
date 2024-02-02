const path = require('path');
const moment = require('moment');
const { createWriteStream, appendFile } = require('fs');
const JSONLoader = require('../data/JSONLoader');
const filePath = path.join(path.resolve(), 'cypress', 'artifacts', 'log.txt');
const timeList = [];
const logList = [];

class Logger {
    static log(step, notTitle) {
        logList.push(` ${step}`);
        const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
        timeList.push(`${timeStamp}`);
        if (!JSONLoader.configData.parallel) {
            notTitle ?? appendFile(filePath, `${timeStamp} ${step}\n`, 'utf8');
            if (JSONLoader.configData.hiddenLogBodies && step.includes('[req]')) {
                const words = step.split(' ');
                const firstPart = words.slice(0, 3).join(' ');
                const secondPart = words.slice(words.length - 2).join(' ');
                console.log(` ${firstPart} ${secondPart}`);
            } else {
                console.log(` ${step}`);
            }
        }

        return timeStamp;
    }

    // static log(step) {
    //     logList.push(` ${step}`);
    //     const timeStamp = moment().format().slice(0, 19).replace('T', ' ');
    //     timeList.push(`${timeStamp}`);
    //     if (!JSONLoader.configData.parallel) {
    //         if (JSONLoader.configData.hiddenLogBodies && step.includes('[req]')) {
    //             const words = step.split(' ');
    //             const firstPart = words.slice(0, 3).join(' ');
    //             const secondPart = words.slice(words.length - 2).join(' ');
    //             console.log(` ${firstPart} ${secondPart}`);
    //         } else {
    //             console.log(` ${step}`);
    //         }
    //     }
        
    //     return timeStamp;
    // }

    static logParallel() {
        logList.forEach((step) => console.log(step));
    }

    static logToFileParallel() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        const specName = summaryList.shift().pop().split(' ')[1];
        const fileName = filePath.split('/')
        .map((part, index, array) => index === array.length - 1 ? specName + '.' + part : part)
        .join('/');
        const stream = JSONLoader.configData.parallel 
        ? createWriteStream(fileName) 
        : createWriteStream(filePath);
        stream.once('open', () => {
            summaryList.forEach((logString) => logString.forEach((logSubString, index) => {
                index % 2 !== 0 ? stream.write(`${logSubString}\n`) : stream.write(`${logSubString}`);
            }));
            stream.end();
        });
    }
}

module.exports = Logger;