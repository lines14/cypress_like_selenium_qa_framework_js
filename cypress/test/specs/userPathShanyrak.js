const mainPage = require('../pageObjects/mainPage');
const shanyrakPage = require('../pageObjects/shanyrakPage');
const policyRequestFormShanyrak = require('../pageObjects/policyRequestFormShanyrak');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const userPathShanyrak = (payTest) => {
    describe('Shanyrak smoke test:', () => {    
        it('Shanyrak client path:', { scrollBehavior: false }, () => {
            cy.open('/');
            mainPage.pageIsDisplayed().should('be.true');
            mainPage.clickGetInsuredButton();
            mainPage.clickShanyrakLink();

            shanyrakPage.pageIsDisplayed().should('be.true');
            shanyrakPage.clickPurchaseButton();

            policyRequestFormShanyrak.pageIsDisplayed().should('be.true');
            policyRequestFormShanyrak.inputPhone();
            policyRequestFormShanyrak.clickNextButton()

            policyRequestFormShanyrak.getSMSCodeBoxElement().should('be.visible')
            .then(() => NodeEvents.getLastCodeFromDB())
            .then((code) => policyRequestFormShanyrak.enterSMSCode(code));

            policyRequestFormShanyrak.inputIIN();
            policyRequestFormShanyrak.getSlicedSelectedClientName()
            .should('be.equal', JSONLoader.testData.clientName);
            policyRequestFormShanyrak.inputEmail();
            policyRequestFormShanyrak.selectRandomCity();
            policyRequestFormShanyrak.inputInsuranceObjectAddressStreet();
            policyRequestFormShanyrak.randomClickPrivateHomeCheckbox();
            policyRequestFormShanyrak.inputInsuranceObjectAddressHouseNumber();
            policyRequestFormShanyrak.inputInsuranceObjectAddressApartmentNumber();
            policyRequestFormShanyrak.clickConfirmationCheckbox();
            policyRequestFormShanyrak.inputRandomStartDate();
            policyRequestFormShanyrak.clickSaveButton();
            policyRequestFormShanyrak.clickAcceptanceCheckbox();
            policyRequestFormShanyrak.getSumToPay().then((sum) => {
                policyRequestFormShanyrak.getPrice()
                .should('be.equal', sum);
                cy.setLocalStorage('sumToPay', sum);
            });
        });

        payTest();
    });
}

module.exports = { userPathShanyrak };