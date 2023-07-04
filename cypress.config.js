// const dotenv = require('dotenv');
const fs = require('fs');
const { defineConfig } = require('cypress');

// dotenv.config();

module.exports = defineConfig({
    env: {
        // defaultPassword: process.env.SEED_DEFAULT_USER_PASSWORD,
    },
    e2e: {
        baseUrl: "http://localhost:3001",
        specPattern: "./cypress/test/specs/*.js",
        supportFile: "./cypress/support/e2e.js",
        viewportHeight: 1080,
        viewportWidth: 1920,
        defaultCommandTimeout: 10000,
        requestTimeout: 15000,
        responseTimeout: 30000,
        pageLoadTimeout: 60000,
        setupNodeEvents(on, config) {
            on('task', {
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
            })
        },
    },
});