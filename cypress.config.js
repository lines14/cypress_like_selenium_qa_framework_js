const path = require('path');
const { defineConfig } = require('cypress');
const allureCommandline = require('allure-commandline');
const logger = require('./cypress/main/utils/log/logger');
const kaspiAPI = require('./cypress/test/API/kaspiAPI');
const configManager = require('./cypress/main/utils/data/configManager');
const notificationDB = require('./cypress/test/DB/notificationDB');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
require('dotenv').config({ path: path.join(__dirname, '.env.test'), override: true });

const generateAllureReport = () => {
    const reportError = new Error('Could not generate Allure report');
    const generation = allureCommandline(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(() => reject(reportError), 5000);
        generation.on('exit', function(exitCode) {
            clearTimeout(generationTimeout);
            if (exitCode !== 0) return reject(reportError);
            resolve();
        });
    });
}

module.exports = defineConfig({
    morgan: false, 
    screenshotOnRunFailure: false,
    video: false,
    env: {
        allure: true,
        allureLogCypress: true,
        allureAvoidLoggingCommands: configManager.getConfigData().allureAvoidLoggingCommands
    },
    e2e: {
        baseUrl: '' || process.env.BASE_URL,
        specPattern: "./cypress/test/specs/*Pay*.js",
        supportFile: "./cypress/support/e2e.js",
        testIsolation: false,
        viewportHeight: 1080,
        viewportWidth: 1920,
        defaultCommandTimeout: 45000,
        requestTimeout: 30000,
        responseTimeout: 50000,
        pageLoadTimeout: 80000,
        setupNodeEvents(on, config) {
            on('after:run', async (results) => {
                logger.logToFile();
                generateAllureReport();
            });
            on('task', {
                log(step) {
                    return logger.log(step);
                },
                async getLastCodeFromDB() {
                    return [
                        await notificationDB.createConnection(), 
                        await notificationDB.getLastCode(), 
                        await notificationDB.closeConnection()
                    ];
                },
                async payWithKaspi(paymentInfo) {
                    return [
                        await kaspiAPI.auth(), 
                        await kaspiAPI.pay(paymentInfo)
                    ];
                }
            });
            allureWriter(on, config);
            return config;
        }     
    }
});