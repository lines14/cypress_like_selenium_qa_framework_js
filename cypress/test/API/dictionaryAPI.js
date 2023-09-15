const path = require('path');
const authAPI = require('./authAPI');
const jsonStringifySafe = require('json-stringify-safe');
const BaseAPI = require('../../main/utils/API/baseAPI');
const ConfigManager = require('../../main/utils/data/configManager');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class DictionaryAPI extends BaseAPI {
    #API;

    constructor(options = {}) {
        super(
            options.baseURL || process.env.GATEWAY_URL,
            options.logString,
            options.timeout, 
            options.headers
        );
    }

    async setToken() {
        const response = await authAPI.auth();
        this.#API = new DictionaryAPI({ headers: { Authorization: `Bearer ${response.response.data.data.access_token}` } });
        return JSON.parse(jsonStringifySafe(response));
    }

    async toggleVerificationOn() {
        const params = { 
            value: 1
        }

        return JSON.parse(jsonStringifySafe(await this.#API.patch(ConfigManager.getAPIEndpoint().verify, params)));
    }

}

module.exports = new DictionaryAPI();