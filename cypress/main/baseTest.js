const path = require('path');
const moment = require('moment-timezone');
const { createWriteStream, readFileSync } = require('fs');
const allureCommandline = require('allure-commandline');
const Logger = require('./utils/log/logger');
const JSONLoader = require('./utils/data/JSONLoader');
const dictionaryAPI = require('../tests/API/dictionaryAPI');
const onesAPI = require('../tests/API/onesAPI');
const OGPODB = require('../tests/DB/OGPODB');

const configDataFileLocation = path.join(__dirname, '../resources/data/configData.json');
const testCarsFileLocation = path.join(__dirname, '../resources/data/testCars.json');
const testClientsFileLocation = path.join(__dirname, '../resources/data/testClients.json');
const averageRBNSFileLocation = path.join(__dirname, '../resources/data/averageRBNS.json');
const activePoliciesFileLocation = path.join(__dirname, '../resources/data/activePolicies.json');

class BaseTest {
  static async beforeAll() {
    moment.tz.setDefault(JSONLoader.configData.timezone);
    const configData = JSON.parse(readFileSync(configDataFileLocation, 'utf8'));
    await dictionaryAPI.setToken();
    await onesAPI.setToken();
    await dictionaryAPI.toggleServer();
    await OGPODB.createConnection();
    const cars = await dictionaryAPI.fetchAllTestCars();
    const clients = await dictionaryAPI.fetchAllTestClients();
    const averageRBNS = await dictionaryAPI.fetchAllAverageRBNS();
    const activePolicies = configData.getPoliciesForClaimFromDB
      ? await OGPODB.getActiveOGPOPolicies()
      : await onesAPI.getActiveOGPOPolicies();
    let stream = createWriteStream(testCarsFileLocation);
    stream.write(JSON.stringify(cars.data, null, 2));
    stream = createWriteStream(testClientsFileLocation);
    stream.write(JSON.stringify(clients.data, null, 2));
    stream = createWriteStream(averageRBNSFileLocation);
    stream.write(JSON.stringify(averageRBNS.data, null, 2));
    stream = createWriteStream(activePoliciesFileLocation);
    stream.write(JSON.stringify(activePolicies, null, 2));
    const response = await dictionaryAPI.getESBDValue();
    configData.withESBD = Boolean(JSON.parse(response.data.setting).value);
    stream = createWriteStream(configDataFileLocation);
    stream.write(JSON.stringify(configData, null, 2));
    await OGPODB.closeConnection();
  }

  static async afterAll(results) {
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
    results.totalFailed
      ? Logger.log(JSONLoader.configData.failed)
      : Logger.log(JSONLoader.configData.passed);

    if (JSONLoader.configData.parallel) {
      Logger.logParallel();
      Logger.logToFileParallel();
    }

    try {
      await BaseTest.generateAllureReport();
    } catch (error) {
      Logger.log(error.message);
    }
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearAllSessionStorage();
  }

  static async generateAllureReport() {
    Logger.log('[inf] ▶ generate allure report');
    const generation = allureCommandline(JSONLoader.configData.allureCommandlineArgs);

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => {
        reject(new Error('[err]   timeout reached while generating allure report!'));
      }, 20000);
      generation.on('exit', (exitCode) => {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(new Error('[err]   could not generate allure report!'));
        }

        return resolve();
      });
    });
  }
}

module.exports = BaseTest;
