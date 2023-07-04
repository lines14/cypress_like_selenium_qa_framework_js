const { assert } = require("chai");
const configManager = require('../../main/utils/data/configManager.js');
const mainPage = require('../pageObjects/mainPageIntroADP.js');

describe('Test suite', () => {    
    it('Test case 1', async () => {
        await browser.url(configManager.getConfigData().baseURL);
        await mainPage.waitLoginForm();
        await mainPage.loginADP();
        await mainPage.waitPageIsExist();
        assert.isTrue(await mainPage.pageIsDisplayed(), 'main page is not open');
    });

    it('Test case 2', async () => {
        await browser.url(configManager.getConfigData().baseURL);
        await mainPage.waitPageIsExist();
        assert.isTrue(await mainPage.pageIsDisplayed(), 'main page is not open');
    });
});