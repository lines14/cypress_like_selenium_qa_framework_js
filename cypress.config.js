const path = require('path');
const allureCommandline = require('allure-commandline');
const kaspiAPI = require('./cypress/test/API/kaspiAPI');
const dictionaryAPI = require('./cypress/test/API/dictionaryAPI');
const notificationDB = require('./cypress/test/DB/notificationDB');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const Logger = require('./cypress/main/utils/log/logger');
const JSONLoader = require('./cypress/main/utils/data/JSONLoader');
const { defineConfig } = require('cypress');
const localStorage = require("cypress-localstorage-commands/plugin");
require('dotenv').config({ path: path.join(__dirname, '.env.test'), override: true });

const generateAllureReport = async () => {
    Logger.log('[inf] ▶ generate allure report');
    const generation = allureCommandline(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(() => reject({ message: '[err]   timeout reached while generating allure report!'}), 10000);
        generation.on('exit', function(exitCode) {
            clearTimeout(generationTimeout);
            if (exitCode !== 0) return reject({ message: '[err]   could not generate allure report!'});
            resolve();
        });
    });
}

module.exports = defineConfig({
    chromeWebSecurity: false,
    morgan: false, 
    screenshotOnRunFailure: true,
    video: true,
    env: {
        allure: true,
        allureLogCypress: true,
        allureAvoidLoggingCommands: JSONLoader.configData.allureAvoidLoggingCommands,
        logLevel: "INFO"
    },
    e2e: {
        baseUrl: '' || process.env.BASE_URL,
        specPattern: "./cypress/test/specs/kaspiPay*.js",
        supportFile: "./cypress/support/e2e.js",
        testIsolation: false,
        viewportHeight: 1080,
        viewportWidth: 1920,
        defaultCommandTimeout: 60000,
        requestTimeout: 30000,
        responseTimeout: 50000,
        pageLoadTimeout: 80000,
        setupNodeEvents(on, config) {
            on('before:run', async () => {
                await dictionaryAPI.setToken();
                await dictionaryAPI.toggleVerificationOn();
            });
            on('after:run', async (results) => {
                try {
                    await generateAllureReport();
                } catch (error) {
                    Logger.log(error.message);
                }
                
                Logger.logToFile();
            });
            on('task', {
                log(step) {
                    return Logger.log(step);
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
                        await kaspiAPI.setToken(), 
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