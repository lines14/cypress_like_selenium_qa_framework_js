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
        const logs = [`[req] ▶ get ${JSON.stringify(params ? params : {})} from ${endpoint}:`];
        if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
        try {
            const response = await this.#axiosInstance.get(`/${endpoint}`, { params });
            logs.push(`[res]   status code: ${response.status}`);
            return { data: response.data, status: response.status, logs };
        } catch (error) {
            logs.push(`[res]   status code: ${error.response.status}`);
            logs.push(`[res]   body: ${JSON.stringify(error.response.data)}`);
            return { data: error.response.data, status: error.response.status, logs };
        }
    }

    async post(endpoint, params) {
        const logs = [`[req] ▶ post ${JSON.stringify(params ? params : {})} to ${endpoint}:`];
        if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
        try {
            const response = await this.#axiosInstance.post(`/${endpoint}`, qs.stringify(params));
            logs.push(`[res]   status code: ${response.status}`);
            return { data: response.data, status: response.status, logs };
        } catch (error) {
            logs.push(`[res]   status code: ${error.response.status}`);
            logs.push(`[res]   body: ${JSON.stringify(error.response.data)}`);
            return { data: error.response.data, status: error.response.status, logs };
        }
    }

    async patch(endpoint, params) {
        const logs = [`[req] ▶ patch ${JSON.stringify(params ? params : {})} to ${endpoint}:`];
        if (this.#logBaseURL) logs.unshift(this.#logBaseURL);
        try {
            const response = await this.#axiosInstance.patch(`/${endpoint}`, qs.stringify(params));
            logs.push(`[res]   status code: ${response.status}`);
            return { data: response.data, status: response.status, logs };
        } catch (error) {
            logs.push(`[res]   status code: ${error.response.status}`);
            logs.push(`[res]   body: ${JSON.stringify(error.response.data)}`);
            return { data: error.response.data, status: error.response.status, logs };
        }
    }
}

module.exports = BaseAPI;