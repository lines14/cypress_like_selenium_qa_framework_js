const qs = require('qs');
const axios = require('axios');

class BaseAPI {
    #baseURL;
    #logString;
    #timeout;
    #headers;
    #logBaseURL;
    #axiosInstance;

    constructor(baseURL, logString, timeout, headers) {
        this.#baseURL = baseURL;
        this.#logString = logString;
        this.#timeout = timeout;
        this.#headers = headers;
        this.#axiosInstance = this.createInstance();
    }

    createInstance() {
        if (this.#logString) this.#logBaseURL = `${this.#logString} ${this.#baseURL}`;
        return axios.create({
            baseURL: this.#baseURL,
            timeout: this.#timeout,
            headers: this.#headers,
        });
    }

    async get(endpoint, params) {
        const logs = [`[info] ▶ get ${endpoint} with ${JSON.stringify(params)}:`];
        if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
        try {
            const response = await this.#axiosInstance.get(`/${endpoint}`, { params });
            logs.push(`[info]   status code: ${response.status}`);
            return { response, logs };
        } catch (error) {
            logs.push(`[info]   status code: ${error.response.status}`);
            return { response: error.response, logs };
        }
    }

    async post(endpoint, params) {
        const logs = [`[info] ▶ post ${JSON.stringify(params)} to ${endpoint}:`];
        if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
        try {
            const response = await this.#axiosInstance.post(`/${endpoint}`, qs.stringify(params));
            logs.push(`[info]   status code: ${response.status}`);
            return { response, logs };
        } catch (error) {
            logs.push(`[info]   status code: ${error.response.status}`);
            return { response: error.response, logs };
        }
    }

    async patch(endpoint, params) {
        const logs = [`[info] ▶ patch ${JSON.stringify(params)} to ${endpoint}:`];
        if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
        try {
            const response = await this.#axiosInstance.patch(`/${endpoint}`, qs.stringify(params));
            logs.push(`[info]   status code: ${response.status}`);
            return { response, logs };
        } catch (error) {
            logs.push(`[info]   status code: ${error.response.status}`);
            return { response: error.response, logs };
        }
    }
}

module.exports = BaseAPI;