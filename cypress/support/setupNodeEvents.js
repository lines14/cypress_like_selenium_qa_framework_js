const kaspiAPI = require('../test/API/kaspiAPI');
const notificationDB = require('../test/DB/notificationDB');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const BaseTest = require('../main/baseTest');
const Logger = require('../main/utils/log/logger');
const localStorage = require("cypress-localstorage-commands/plugin");

exports.setupNodeEvents = {
    setupNodeEvents(on, config) {
        on('before:run', BaseTest.beforeAll);
        on('after:run', BaseTest.afterAll);
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