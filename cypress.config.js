const fs = require('fs');
const dotenv = require('dotenv');
const { defineConfig } = require('cypress');
const kaspiAPI = require('./cypress/test/API/kaspiAPI.js');
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
            const textAccumulator = [];
            on('task', {
                addTextToAccumulator(text) {
                    textAccumulator.push(text);
                    console.log(text);
                    console.log(textAccumulator);
                },
                async getLastCodeFromDB() {
                    return await notificationDB.getLastCode();
                },
                async payKaspi(paymentInfo) {
                    console.log({paymentInfo});
                    await kaspiAPI.loginAPI();
                    const res = await kaspiAPI.payKaspi(paymentInfo);
                    console.log({res});
                    return null;
                },
                addToDictionary(key, value) {
                    dictionary[`${key}`] = value;
                    return null;
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