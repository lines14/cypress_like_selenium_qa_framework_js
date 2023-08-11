const moment = require('moment');
const BaseAPI = require('../../main/utils/API/baseAPI.js');
const configManager = require('../../main/utils/data/configManager.js');
const randomizer = require('../../main/utils/random/randomizer.js');

class KaspiAPI extends BaseAPI {
    constructor(options = {}) {
        super(
            options.baseURL || configManager.getAPIConfigData().APIBaseURL,
            options.log || '[info] ▶ set base api url',
            options.timeout || configManager.getConfigData().waitTime, 
            options.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
            });
    }

    async loginAPI() {
        const params = { 
            login: 'online', 
            password: 'online21@CK!',
        }
        
        this.accessToken = (await this.post(configManager.getAPIEndpoint().loginAPI, params)).data.data.access_token;
    }

    async payWithKaspi(paymentInfo) {
        new KaspiAPI({ headers: { Authorization: `Bearer ${this.accessToken}` } });
        const params = { 
            command: 'pay', 
            txn_id: randomizer.getRandomString(false, false, true, false, false, 18, 18),
            txn_date: moment().format().slice(0, 19).replace(/-|T|:/g, ''),
            account: paymentInfo.paymentNumber,
            sum: paymentInfo.sumToPay,
        }

        return await this.get(configManager.getAPIEndpoint().kaspiPay, params);
    }
}

module.exports = new KaspiAPI();