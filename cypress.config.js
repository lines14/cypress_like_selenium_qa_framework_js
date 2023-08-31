const path = require('path');
const { defineConfig } = require('cypress');
const allureCommandline = require('allure-commandline');
const kaspiAPI = require('./cypress/test/API/kaspiAPI');
const logger = require('./cypress/main/utils/log/logger');
const notificationDB = require('./cypress/test/DB/notificationDB');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const localStorage = require("cypress-localstorage-commands/plugin");
const configManager = require('./cypress/main/utils/data/configManager');
require('dotenv').config({ path: path.join(__dirname, '.env.test'), override: true });

const generateAllureReport = async () => {
    logger.log('[info] ▶ generate allure report');
    const generation = allureCommandline(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(() => reject({ message: '[erro]   timeout reached while generating allure report!'}), 10000);
        generation.on('exit', function(exitCode) {
            clearTimeout(generationTimeout);
            if (exitCode !== 0) return reject({ message: '[erro]   could not generate allure report!'});
            resolve();
        });
    });
}

module.exports = defineConfig({
    chromeWebSecurity: false,
    morgan: false, 
    screenshotOnRunFailure: false,
    video: false,
    env: {
        allure: true,
        allureLogCypress: true,
        allureAvoidLoggingCommands: configManager.getConfigData().allureAvoidLoggingCommands,
        logLevel: "INFO"
    },
    e2e: {
        baseUrl: '' || process.env.BASE_URL,
        specPattern: "./cypress/test/specs/*Pay*.js",
        supportFile: "./cypress/support/e2e.js",
        testIsolation: false,
        viewportHeight: 1080,
        viewportWidth: 1920,
        defaultCommandTimeout: 60000,
        requestTimeout: 30000,
        responseTimeout: 50000,
        pageLoadTimeout: 80000,
        setupNodeEvents(on, config) {
            on('after:run', async (results) => {
                try {
                    await generateAllureReport();
                } catch (error) {
                    logger.log(error.message);
                }
                
                logger.logToFile();
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
            localStorage(on, config);
            return config;
        }     
    }
});