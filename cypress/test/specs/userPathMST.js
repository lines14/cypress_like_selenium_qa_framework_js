const mainPage = require('../pageObjects/mainPage');
const MSTPage = require('../pageObjects/MSTPage');
const policyRequestFormMST = require('../pageObjects/policyRequestFormMST');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const userPathMST = (payTest) => {
    describe('MST smoke test:', () => {    
        it('MST client path:', { scrollBehavior: false }, () => {
            cy.open('/');
            mainPage.pageIsDisplayed().should('be.true');
            mainPage.clickGetInsuredButton();
            mainPage.clickMSTLink();

            MSTPage.pageIsDisplayed().should('be.true');
            MSTPage.clickPurchaseButton();

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
            .should('contain', JSONLoader.testData.clientName);
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

            policyRequestFormMST.inputAddress();
            policyRequestFormMST.clickNextButton();

            policyRequestFormMST.inputEmail();
            policyRequestFormMST.clickNextButton();

            policyRequestFormMST.inputPhone();
            policyRequestFormMST.clickNextButton()

            policyRequestFormMST.getSMSCodeBoxElement().should('be.visible')
            .then(() => NodeEvents.getLastCodeFromDB())
            .then((code) => policyRequestFormMST.enterSMSCode(code));
 
            policyRequestFormMST.clickAcceptanceCheckbox();
            policyRequestFormMST.getSumToPay().then((sum) => {
                cy.setLocalStorage('sumToPay', sum);
                policyRequestFormMST.getTotalCostFromDisplayedValues()
                .should('be.equal', Number(sum));
            });
        });

        payTest();
    });
}

module.exports = { userPathMST };