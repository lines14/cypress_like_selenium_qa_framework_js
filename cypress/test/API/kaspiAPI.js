const path = require('path');
const authAPI = require('./authAPI');
const moment = require('moment');
const jsonStringifySafe = require('json-stringify-safe');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Randomizer = require('../../main/utils/random/randomizer');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class KaspiAPI extends BaseAPI {
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
        const response = await authAPI.auth({ APIName: 'Kaspi API' });
        this.#API = new KaspiAPI({ headers: { Authorization: `Bearer ${response.response.data.data.access_token}` } });
        return JSON.parse(jsonStringifySafe(response));
    }

    async pay(paymentInfo) {
        const params = { 
            command: 'pay', 
            txn_id: Randomizer.getRandomString(false, false, true, false, false, 18, 18),
            txn_date: moment().format().slice(0, 19).replace(/-|T|:/g, ''),
            account: paymentInfo.paymentNumber,
            sum: paymentInfo.sumToPay,
        }

        return JSON.parse(jsonStringifySafe(await this.#API.get(JSONLoader.APIEndpoints.kaspi.pay, params)));
    }
}

module.exports = new KaspiAPI();