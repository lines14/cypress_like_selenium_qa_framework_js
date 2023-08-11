const logger = require('../../main/utils/log/logger.js');
const configManager = require('../../main/utils/data/configManager.js');
const mainPageMST = require('../pageObjects/mainPageMST.js');
const tourismPageMST = require('../pageObjects/tourismPageMST.js');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST.js');

describe('MST smoke test', () => {    
    it('Kaspi client path', { scrollBehavior: false }, () => {
        cy.visit(configManager.getConfigData().baseURL);
        mainPageMST.pageIsDisplayed().should('be.true');
        mainPageMST.clickGetInsuredButton();
        mainPageMST.clickTourismLink();

        tourismPageMST.pageIsDisplayed().should('be.true');
        tourismPageMST.clickPurchaseButton();

        policyRequestFormMST.pageIsDisplayed().should('be.true');
        policyRequestFormMST.selectThreeRandomCountries();
        policyRequestFormMST.isDisplayedCountriesEqualSelected().should('be.true');
        policyRequestFormMST.inputRandomDates();
        policyRequestFormMST.isDisplayedDatesEqualSelected().should('be.true');
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

        policyRequestFormMST.enterSMSCode();

        policyRequestFormMST.payWithKaspi();

        logger.logToFile();
    });
});