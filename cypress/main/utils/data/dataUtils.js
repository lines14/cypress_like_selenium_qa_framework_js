const logger = require('../log/logger.js');

class DataUtils {
    isJson(response) {
        logger.log(`[info] ▶ check response is json`);
        return typeof response === "object";
    }

    addToDictionary(key, value) {
        cy.task('addToDictionary', key, value);
    }
}

module.exports = new DataUtils();