const allureCommandline = require('allure-commandline');
const dictionaryAPI = require('../test/API/dictionaryAPI');
const Logger = require('../main/utils/log/logger');
const JSONLoader = require('../main/utils/data/JSONLoader');

class BaseTest {
    static async beforeAll() {
        await dictionaryAPI.setToken();
        await dictionaryAPI.toggleServer();
        await dictionaryAPI.toggleVerification();
    }

    static async afterAll() {
        try {
            await BaseTest.generateAllureReport();
        } catch (error) {
            Logger.log(error.message);
        }
        
        Logger.logToFile();
    }

    static async generateAllureReport() {
        Logger.log('[inf] ▶ generate allure report');
        const generation = allureCommandline(JSONLoader.configData.allureCommandlineArgs);
    
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject({ 
                message: '[err]   timeout reached while generating allure report!'
            }), 10000);
            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject({ 
                    message: '[err]   could not generate allure report!'
                });
                resolve();
            });
        });
    }
}

module.exports = BaseTest;