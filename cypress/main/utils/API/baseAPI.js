const axios = require('axios');
const logger = require('../log/logger.js');

class BaseAPI {
    constructor(baseURL, logString, timeout, headers) {
        if (logString) logger.log(`${logString} ${baseURL}`);
        axios.defaults.baseURL = baseURL;
        axios.defaults.timeout = timeout;
        axios.defaults.headers = headers;
    }

    get(endpoint, params) {
        try {
            logger.log(`[info] ▶ get ${endpoint} with ${JSON.stringify(params)}:`);
            const response = axios.get(`/${endpoint}`, { params });
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    post(endpoint, params) {
        try {
            logger.log(`[info] ▶ post ${JSON.stringify(params)} to ${endpoint}:`);
            const response = axios.post(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    put(endpoint, params) {
        try {
            logger.log(`[info] ▶ put ${JSON.stringify(params)} to ${endpoint}`);
            const response = axios.put(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    patch(endpoint, params) {
        try {
            logger.log(`[info] ▶ patch ${JSON.stringify(params)} in ${endpoint}`);
            const response = axios.patch(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    delete(endpoint) {
        try {
            logger.log(`[info] ▶ delete ${endpoint}`);
            const response = axios.delete(endpoint);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }
}

module.exports = BaseAPI;