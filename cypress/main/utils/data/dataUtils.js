const { parseStringPromise } = require('xml2js');

class DataUtils {
    static async XMLToJSON(xml) {
        return (await parseStringPromise(xml)).response;
    }
}

module.exports = DataUtils;