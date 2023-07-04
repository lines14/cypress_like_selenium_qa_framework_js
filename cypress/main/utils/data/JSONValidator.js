const logger = require('../log/logger.js');

class JSONValidator {
    isJson(response) {
        logger.log(`[info] ▶ check response is json`);
        return typeof response === "object";
    }
}

module.exports = new JSONValidator();