const kaspiAPI = require('../test/API/kaspiAPI');
const notificationDB = require('../test/DB/notificationDB');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const BaseTest = require('../main/baseTest');
const Logger = require('../main/utils/log/logger');
const cypressSplit = require('cypress-split')
const localStorage = require("cypress-localstorage-commands/plugin");

exports.setupNodeEvents = {
    setupNodeEvents(on, config) {
        cypressSplit(on, config);
        on('before:run', BaseTest.beforeAll);
        on('after:run', BaseTest.afterAll);
        on('task', {
            log({ step, title }) {
                return Logger.log(step, title);
            },
            async getLastCodeFromDB(phoneNumber) {
                return [
                    await notificationDB.createConnection(), 
                    await notificationDB.getLastCode(phoneNumber), 
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