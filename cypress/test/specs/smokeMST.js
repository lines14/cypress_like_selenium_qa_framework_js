const { assert } = require("chai");
const logger = require('../../main/utils/log/logger.js');
const configManager = require('../../main/utils/data/configManager.js');
const mainPageMST = require('../pageObjects/mainPageMST.js');
const tourismPageMST = require('../pageObjects/tourismPageMST.js');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST.js');
// const notificationDB = require('../DB/notificationDB.js');
// const kaspiAPI = require('../API/kaspiAPI.js');

describe('MST smoke test', () => {    
    it('Kaspi client path', { scrollBehavior: false }, () => {
        cy.visit(configManager.getConfigData().baseURL);

        mainPageMST.pageIsDisplayed();
        mainPageMST.clickGetInsuredButton();
        mainPageMST.clickTourismLink();


        tourismPageMST.pageIsDisplayed();
        tourismPageMST.clickPurchaseButton();

        policyRequestFormMST.pageIsDisplayed();

        policyRequestFormMST.selectThreeRandomCountries();
        // policyRequestFormMST.inputRandomDates();
        // policyRequestFormMST.inputIIN();
        // policyRequestFormMST.selectRandomInsuranceLimit();

        // policyRequestFormMST.selectRandomPurposeOfTheTrip();
        // policyRequestFormMST.selectRandomAdditionalCheckboxesAndCalculate();
        // policyRequestFormMST.clickNextButton();


        // policyRequestFormMST.clickNextButton();

        // policyRequestFormMST.inputEmail();
        // policyRequestFormMST.clickNextButton();

        // policyRequestFormMST.inputPhone();
        // policyRequestFormMST.clickNextButton();

        // policyRequestFormMST.inputSMSCode(notificationDB.getLastRecordCode());
        // policyRequestFormMST.clickNextButton();

        // policyRequestFormMST.payWithKaspi();
        // kaspiAPI.loginAPI();
        // console.log((kaspiAPI.payKaspi(policyRequestFormMST.getKaspiPaymentInfo())).data);

        logger.logToFile();
    });
});