const nodeEvents = require('../../support/nodeEvents');
const mainPageMST = require('../pageObjects/mainPageMST');
const tourismPageMST = require('../pageObjects/tourismPageMST');
const configManager = require('../../main/utils/data/configManager');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');

const userPathMST = (payTest) => {
    describe('MST smoke test:', () => {    
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
            .then((displayedCountries) => policyRequestFormMST.getSelectedCountries()
            .should('be.deep.equal', displayedCountries));
            policyRequestFormMST.inputRandomDates();
            policyRequestFormMST.getDisplayedDates()
            .then((displayedDates) => policyRequestFormMST.getSelectedDates()
            .should('be.deep.equal', displayedDates));
            policyRequestFormMST.inputIIN();
            policyRequestFormMST.getSelectedClientNameElement()
            .should('have.text', configManager.getTestData().clientName);
            policyRequestFormMST.getSlicedDisplayedClientName()
            .then((slicedName) => policyRequestFormMST.getSelectedClientNameElement()
            .should('contain', slicedName));
            policyRequestFormMST.selectRandomInsuranceLimit();
            policyRequestFormMST.selectRandomPurposeOfTheTrip();
            policyRequestFormMST.getDisplayedPurposeOfTheTrip()
            .then((displayedPurpose) => policyRequestFormMST.getSelectedPurposeOfTheTrip()
            .should('be.equal', displayedPurpose));
            policyRequestFormMST.clickRandomAdditionalCheckboxes();
            policyRequestFormMST.clickCalculateButton();
            policyRequestFormMST.clickNextButton();

            policyRequestFormMST.clickNextButton();

            policyRequestFormMST.inputEmail();
            policyRequestFormMST.clickNextButton();

            policyRequestFormMST.inputPhone();
            policyRequestFormMST.clickNextButton();

            nodeEvents.getLastCodeFromDB()
            .then((code) => policyRequestFormMST.enterSMSCode(code));
 
            policyRequestFormMST.clickAcceptanceCheckbox();
            policyRequestFormMST.getSumToPay().then((sum) => {
                cy.setLocalStorage('sumToPay', sum);
                policyRequestFormMST.getPolicyCostDiscountDelta()
                .should('be.equal', Number(sum));
            });
        });

        payTest();
    });
}

module.exports = { userPathMST };