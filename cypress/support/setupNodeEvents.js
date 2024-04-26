const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const cypressSplit = require('cypress-split');
const localStorage = require('cypress-localstorage-commands/plugin');
const kaspiAPI = require('../tests/API/kaspiAPI');
const notificationDB = require('../tests/DB/notificationDB');
const BaseTest = require('../main/baseTest');
const Logger = require('../main/utils/log/logger');

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
          await notificationDB.closeConnection(),
        ];
      },
      async payWithKaspi(paymentInfo) {
        return [
          await kaspiAPI.setToken(),
          await kaspiAPI.pay(paymentInfo),
        ];
      },
    });

    allureWriter(on, config);
    localStorage(on, config);
    return config;
  },
};
