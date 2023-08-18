const path = require('path');
const moment = require('moment');
const jsonStringifySafe = require('json-stringify-safe');
const BaseAPI = require('../../main/utils/API/baseAPI');
const configManager = require('../../main/utils/data/configManager');
const randomizer = require('../../main/utils/random/randomizer');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class KaspiAPI extends BaseAPI {
    constructor(options = {}) {
        super(
            options.baseURL || '' || process.env.GATEWAY_URL,
            options.log || '[info] ▶ set base API URL',
            options.timeout || configManager.getAPIConfigData().timeout, 
            options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
            });
    }

    async auth() {
        const params = { 
            login: '' || process.env.AUTH_LOGIN, 
            password: '' || process.env.AUTH_PASSWORD,
        }
        
        const response = await this.post(configManager.getAPIEndpoint().loginAPI, params);
        new KaspiAPI({ headers: { Authorization: `Bearer ${response.response.data.data.access_token}` } });
        return JSON.parse(jsonStringifySafe(response));
    }

    async pay(paymentInfo) {
        const params = { 
            command: 'pay', 
            txn_id: randomizer.getRandomString(false, false, true, false, false, 18, 18),
            txn_date: moment().format().slice(0, 19).replace(/-|T|:/g, ''),
            account: paymentInfo.paymentNumber,
            sum: paymentInfo.sumToPay,
        }

        return JSON.parse(jsonStringifySafe(await this.get(configManager.getAPIEndpoint().kaspiPay, params)));
    }
}

module.exports = new KaspiAPI();