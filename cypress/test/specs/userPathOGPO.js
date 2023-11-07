const mainPage = require('../pageObjects/mainPage');
const obligatoryTransportPage = require('../pageObjects/obligatoryTransportPage');
const policyRequestFormOGPO = require('../pageObjects/policyRequestFormOGPO');
// const NodeEvents = require('../../support/nodeEvents');

const userPathOGPO = (payTest) => {
    describe('OGPO smoke test:', () => {    
        it('OGPO client path:', { scrollBehavior: false }, () => {
            cy.open('/');
            mainPage.pageIsDisplayed().should('be.true');
            mainPage.clickGetInsuredButton();
            mainPage.clickSummaryTransportButton();
            mainPage.clickObligatoryTransportLink();

            obligatoryTransportPage.pageIsDisplayed().should('be.true');
            obligatoryTransportPage.clickPurchaseButton();

            policyRequestFormOGPO.pageIsDisplayed().should('be.true');
            policyRequestFormOGPO.inputPhone();
            policyRequestFormOGPO.clickNextButton();
        });

        payTest();
    });
}

module.exports = { userPathOGPO };