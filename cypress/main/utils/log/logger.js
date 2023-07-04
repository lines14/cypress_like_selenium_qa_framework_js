const moment = require('moment');
const timeList = [];
const logList = [];

class Logger {
    log(step) {
        cy.task('log', step);
        logList.push(` ${step}\n`);
        const timeStamp = moment().format().slice(0, 19).replace('T', ' ');

        timeList.push(`${timeStamp}`);
    }

    logToFile() {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const summaryList = zip(timeList, logList);
        cy.task('logToFile', summaryList);
    }

    getTimings() {
        return [...timeList];
    }
}

module.exports = new Logger();