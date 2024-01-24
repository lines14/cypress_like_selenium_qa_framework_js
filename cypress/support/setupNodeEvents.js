const kaspiAPI = require('../test/API/kaspiAPI');
// const notificationDB = require('../test/DB/notificationDB');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const BaseTest = require('../main/baseTest');
const Logger = require('../main/utils/log/logger');
const cypressSplit = require('cypress-split')
const localStorage = require("cypress-localstorage-commands/plugin");

exports.setupNodeEvents = {
    setupNodeEvents(on, config) {
        on('before:run', BaseTest.beforeAll);
        on('after:run', BaseTest.afterAll);
        on('task', {
            log(step) {
                return Logger.log(step);
            },
            // async getLastCodeFromDB(phoneNumber) {
            //     return [
            //         await notificationDB.createConnection(), 
            //         await notificationDB.getLastCode(phoneNumber), 
            //         await notificationDB.closeConnection()
            //     ];
            // },
            async payWithKaspi(paymentInfo) {
                return [
                    await kaspiAPI.setToken(), 
                    await kaspiAPI.pay(paymentInfo)
                ];
            }
        });

        cypressSplit(on, config);
        allureWriter(on, config);
        localStorage(on, config);
        return config;
    }
}