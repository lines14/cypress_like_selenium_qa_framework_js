const logger = require('../../main/utils/log/logger.js');
const configManager = require('../../main/utils/data/configManager.js');
const mainPageMST = require('../pageObjects/mainPageMST.js');
const tourismPageMST = require('../pageObjects/tourismPageMST.js');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST.js');

describe('MST smoke test:', () => {    
    it('Kaspi client path:', { scrollBehavior: false }, () => {
        let sumToPay;
        cy.visit(configManager.getConfigData().baseURL);
        mainPageMST.pageIsDisplayed().should('be.true');
        mainPageMST.clickGetInsuredButton();
        mainPageMST.clickTourismLink();
        tourismPageMST.pageIsDisplayed().should('be.true');
        tourismPageMST.clickPurchaseButton();
        policyRequestFormMST.pageIsDisplayed().should('be.true');
        policyRequestFormMST.selectThreeRandomCountries();
        policyRequestFormMST.getDisplayedCountries()
        .then((displayedList) => policyRequestFormMST.getSelectedCountries()
        .should('be.deep.equal', displayedList));
        policyRequestFormMST.inputRandomDates();
        policyRequestFormMST.getDisplayedDates()
        .then((displayedList) => policyRequestFormMST.getSelectedDates()
        .should('be.deep.equal', displayedList));
        policyRequestFormMST.inputIIN();
        policyRequestFormMST.getDisplayedClientName()
        .then((displayedName) => policyRequestFormMST.getSelectedClientName()
        .should('be.equal', displayedName));
        policyRequestFormMST.selectRandomInsuranceLimit();
        policyRequestFormMST.selectRandomPurposeOfTheTrip();
        policyRequestFormMST.getDisplayedPurposeOfTheTrip()
        .then((displayedPurpose) => policyRequestFormMST.getSelectedPurposeOfTheTrip()
        .should('be.equal', displayedPurpose));
        policyRequestFormMST.clickRandomAdditionalCheckboxesAndCalculate();
        policyRequestFormMST.clickNextButton();
        policyRequestFormMST.getSumToPay()
        .then((sum) => sumToPay = sum)
        .then(() => policyRequestFormMST.getPolicyCostDiscountDelta()
        .should('be.equal', Number(sumToPay)));
        policyRequestFormMST.clickNextButton();
        policyRequestFormMST.inputEmail();
        policyRequestFormMST.clickNextButton();
        policyRequestFormMST.inputPhone();
        policyRequestFormMST.clickNextButton();
        cy.task('getLastCodeFromDB')
        .then((code) => policyRequestFormMST.enterSMSCode(code));
        policyRequestFormMST.clickAcceptanceCheckbox();
        policyRequestFormMST.clickKaspiButton();
        policyRequestFormMST.getPaymentNumber()
        .then((paymentNumber) => cy.task('payWithKaspi', { sumToPay, paymentNumber }))
        .then((response) => cy.wrap(response.comment.pop())
        .should('have.text', 'оплачен'));
        logger.logToFile();
    });
});