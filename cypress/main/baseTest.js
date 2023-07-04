const logger = require('./utils/log/logger.js');
const browserUtils = require('./driver/browserUtils.js');
// const notificationDB = require('../test/DB/notificationDB.js');

exports.mochaHooks = {
    async beforeAll() {
        await browserUtils.configureBrowserCommands();
    },
    async afterAll() {
        // await notificationDB.closeConnection();
        await logger.logToFile();
    },
}