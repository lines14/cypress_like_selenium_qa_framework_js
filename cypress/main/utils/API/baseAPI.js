const axios = require('axios');

class BaseAPI {
    constructor(baseURL, logString, timeout, headers) {
        if (logString) this.logBaseURL = `${logString} ${baseURL}`;
        axios.defaults.baseURL = baseURL;
        axios.defaults.timeout = timeout;
        axios.defaults.headers = headers;
    }

    async get(endpoint, params) {
        const logs = [`[info] ▶ get ${endpoint} with ${JSON.stringify(params)}:`];
        logs.unshift(this.logBaseURL);
        try {
            const response = await axios.get(`/${endpoint}`, { params });
            logs.push(`[info]   status code: ${response.status}`);
            return { response, logs };
        } catch (error) {
            logs.push(`[info]   status code: ${error.response.status}`);
            return { response: error.response, logs };
        }
    }

    async post(endpoint, params) {
        const logs = [`[info] ▶ post ${JSON.stringify(params)} to ${endpoint}:`];
        logs.unshift(this.logBaseURL);
        try {
            const response = await axios.post(`/${endpoint}`, params);
            logs.push(`[info]   status code: ${response.status}`);
            return { response, logs };
        } catch (error) {
            logs.push(`[info]   status code: ${error.response.status}`);
            return { response: error.response, logs };
        }
    }
}

module.exports = BaseAPI;