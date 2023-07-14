// const { assert } = require("chai");
const logger = require('../../main/utils/log/logger.js');
const configManager = require('../../main/utils/data/configManager.js');
const mainPageMST = require('../pageObjects/mainPageMST.js');
const tourismPageMST = require('../pageObjects/tourismPageMST.js');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST.js');

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
        policyRequestFormMST.inputRandomDates();
        policyRequestFormMST.inputIIN();
        policyRequestFormMST.selectRandomInsuranceLimit();
        policyRequestFormMST.selectRandomPurposeOfTheTrip();
        policyRequestFormMST.selectRandomAdditionalCheckboxesAndCalculate();
        policyRequestFormMST.clickNextButton();

        // policyRequestFormMST.inputPassportGivenDate();
        // policyRequestFormMST.inputPassportData();
        policyRequestFormMST.clickNextButton();

        policyRequestFormMST.inputEmail();
        policyRequestFormMST.clickNextButton();

        policyRequestFormMST.inputPhone();
        policyRequestFormMST.clickNextButton();

        cy.task('getLastCodeFromDB').then((resp) => policyRequestFormMST.enterSMSCode(resp));

        policyRequestFormMST.payWithKaspi();






        
        // cy.wrap(policyRequestFormMST.payWithKaspi()).as('paymentInfo');
        // cy.task('log', paymentInfo.account);
        // cy.task('log', Cypress.env());

        // cy.get('@paymentInfo').then((payInfo) => {
            // cy.task('log', payInfo);
            // cy.get(`@${payInfo.account}`).then((text) => this.account = text);
            // cy.get(`@${payInfo.sum}`).then((text) => this.sum = text);
            // cy.task('payKaspi', { account: this.account, sum: this.sum });
        // });
        // cy.get(`@${paymentInfo}`).then((text) => cy.task('log', text));
        // cy.task('payKaspi', paymentInfo);
        // policyRequestFormMST.payWithKaspi().then((paymentInfo) => {
        //     // cy.task('log', paymentInfo);
        //     cy.task('payKaspi', 'kek');
        // });

        logger.logToFile();
    });
});