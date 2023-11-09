const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const policyRequestFormOGPO = require('../pageObjects/policyRequestFormOGPO');
// const NodeEvents = require('../../support/nodeEvents');

const userPathOGPO = (payTest) => {
    describe('OGPO smoke test:', () => {    
        it('OGPO client path:', { scrollBehavior: false }, () => {
            cy.open('/');
            mainPage.pageIsDisplayed().should('be.true');
            mainPage.clickGetInsuredButton();
            mainPage.clickTransportButton();
            mainPage.clickOGPOLink();

            OGPOPage.pageIsDisplayed().should('be.true');
            OGPOPage.clickPurchaseButton();

            policyRequestFormOGPO.pageIsDisplayed().should('be.true');
            policyRequestFormOGPO.inputPhone();
            policyRequestFormOGPO.clickNextButton();
        });

        payTest();
    });
}

module.exports = { userPathOGPO };