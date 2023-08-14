const parseString = require('xml2js').parseString;
const logger = require('../log/logger.js');

class DataUtils {
    isJSON(response) {
        logger.log(`[info] ▶ check response is json`);
        return typeof response === "object";
    }

    async XMLToJSON(xml) {
        return new Promise((resolve, reject) => {
            parseString(xml, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.response);
                }
            });
        });
    }
}

module.exports = new DataUtils();