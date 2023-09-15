const path = require('path');
const BaseAPI = require('../../main/utils/API/baseAPI');
const ConfigManager = require('../../main/utils/data/configManager');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class AuthAPI extends BaseAPI {
    #login;
    #password;

    constructor(options = {}) {
        super(
            options.baseURL || process.env.GATEWAY_URL,
            options.logString ?? '[info] ▶ set base API URL:',
            options.timeout,
            options.headers
        );
        this.#login = process.env.AUTH_LOGIN;
        this.#password = process.env.AUTH_PASSWORD;
    }

    async auth(user) {
        const params = user 
        ? { login: user.login, password: user.password } 
        : { login: this.#login, password: this.#password };

        return await this.post(ConfigManager.getAPIEndpoint().login, params);
    }
}

module.exports = new AuthAPI();