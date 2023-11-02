const mainPage = require('../pageObjects/mainPage');
const shanyrakPage = require('../pageObjects/shanyrakPage');
const policyRequestFormShanyrak = require('../pageObjects/policyRequestFormShanyrak');
const NodeEvents = require('../../support/nodeEvents');

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
            policyRequestFormShanyrak.clearPreviousEmail();
            policyRequestFormShanyrak.inputEmail();
        });

        payTest();
    });
}

module.exports = { userPathShanyrak };