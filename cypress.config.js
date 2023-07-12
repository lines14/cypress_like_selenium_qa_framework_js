const fs = require('fs');
const dotenv = require('dotenv');
const { defineConfig } = require('cypress');
const notificationDB = require('./cypress/test/DB/notificationDB.js');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

dotenv.config();

module.exports = defineConfig({
    morgan: false, 
    screenshotOnRunFailure: false,
    video: false,
    env: {
        // defaultPassword: process.env.SEED_DEFAULT_USER_PASSWORD,
    },
    e2e: {
        // baseUrl: "http://localhost:3001",
        specPattern: "./cypress/test/specs/*.js",
        supportFile: "./cypress/support/e2e.js",
        viewportHeight: 1080,
        viewportWidth: 1920,
        defaultCommandTimeout: 45000,
        requestTimeout: 30000,
        responseTimeout: 50000,
        pageLoadTimeout: 80000,
        setupNodeEvents(on, config) {
            on('task', {
                async getLastRecordCodeFromDB(createTime) {
                    const response = await notificationDB.getLastRecordCode(createTime);
                    console.log(createTime);
                    return response;
                    // return await notificationDB.getLastRecordCode(createTime);
                },
                log(message) {
                    console.log(message);
                    return null;
                },
                logToFile(array) {
                    const stream = fs.createWriteStream("cypress/test/log.txt");
                    stream.once('open', () => {
                        array.forEach((element) => element.forEach((elem) => stream.write(elem)));
                        stream.end();
                    });
                    return null;
                }
            });
            allureWriter(on, config);
            return config;
        },
    },
});