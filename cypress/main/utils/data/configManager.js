const configData = require('../../../resources/configData.json');
const testData = require('../../../resources/testData.json');
const APICodes = require('../API/APICodes.json');
const APIEndpoints = require('../../../resources/APIEndpoints.json');
const APIConfigData = require('../../../resources/APIConfigData.json');
const DBConfigData = require('../../../resources/DBConfigData.json');
// const authData = require('../../../resources/authData.json');
const path = require("path");

class ConfigManager {
    getConfigData() {
        return JSON.parse(JSON.stringify(configData));
    }

    getTestData() {
        return JSON.parse(JSON.stringify(testData));
    }

    getTestFile() {
        return path.join(path.resolve(), "test", "template.jpg");
    }

    getStatusCode() {
        return JSON.parse(JSON.stringify(APICodes));
    }

    getAPIEndpoint() {
        return JSON.parse(JSON.stringify(APIEndpoints));
    }

    getAPIConfigData() {
        return JSON.parse(JSON.stringify(APIConfigData));
    }

    getDBConfigData() {
        return JSON.parse(JSON.stringify(DBConfigData));
    }

    // getAuthData() {
    //     return JSON.parse(JSON.stringify(authData));
    // }
}

module.exports = new ConfigManager();