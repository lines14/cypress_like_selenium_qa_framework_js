const path = require('path');
const { defineConfig } = require('cypress');
const JSONLoader = require('./main/utils/data/JSONLoader');
const { setupNodeEvents } = require('./support/setupNodeEvents');
require('dotenv').config({ path: path.join(__dirname, '.env.test'), override: true });

module.exports = defineConfig({
  chromeWebSecurity: false,
  morgan: false,
  screenshotOnRunFailure: true,
  video: false,
  downloadsFolder: './downloads',
  screenshotsFolder: './screenshots',
  videosFolder: './videos',
  env: {
    allure: true,
    allureResultsPath: './artifacts/allure-results',
    allureLogCypress: true,
    allureAvoidLoggingCommands: JSONLoader.configData.allureAvoidLoggingCommands,
    logLevel: 'INFO',
    login: process.env.AUTH_LOGIN,
    password: process.env.AUTH_PASSWORD,
  },
  e2e: {
    baseUrl: '' || process.env.BASE_URL,
    specPattern: './tests/specs/*Suite.js',
    supportFile: './support/e2e.js',
    testIsolation: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 60000,
    requestTimeout: 30000,
    responseTimeout: 50000,
    pageLoadTimeout: 80000,
    ...setupNodeEvents,
  },
});
