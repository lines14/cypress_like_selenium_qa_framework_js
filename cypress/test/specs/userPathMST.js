const mainPageMST = require('../pageObjects/mainPageMST');
const tourismPageMST = require('../pageObjects/tourismPageMST');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const nodeEvents = require('../../support/nodeEvents');

const userPathMST = (payTest) => {
    describe('MST smoke test:', () => {    
        let sumToPay; 
        it('MST client path:', { scrollBehavior: false }, () => {
            cy.open('/');
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

            nodeEvents.getLastCodeFromDB()
            .then((code) => policyRequestFormMST.enterSMSCode(code));

            policyRequestFormMST.clickAcceptanceCheckbox();
        });

        payTest();
    });
}

module.exports = { userPathMST };