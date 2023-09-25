const path = require('path');
const { defineConfig } = require('cypress');
const JSONLoader = require('./cypress/main/utils/data/JSONLoader');
const { setupNodeEvents } = require('./cypress/support/setupNodeEvents');
require('dotenv').config({ path: path.join(__dirname, '.env.test'), override: true });

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
        ...setupNodeEvents
    }
});