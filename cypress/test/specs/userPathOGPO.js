const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const policyRequestFormOGPO = require('../pageObjects/policyRequestFormOGPO');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

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

            policyRequestFormOGPO.getSMSCodeBoxElement().should('be.visible')
            .then(() => NodeEvents.getLastCodeFromDB())
            .then((code) => policyRequestFormOGPO.enterSMSCode(code));

            policyRequestFormOGPO.inputIIN();
            policyRequestFormOGPO.clearPreviousEmail();
            policyRequestFormOGPO.inputEmail();
            policyRequestFormOGPO.clickNextButton();

            policyRequestFormOGPO.clickSaveButton();
            policyRequestFormOGPO.clickNextButton();

            policyRequestFormOGPO.inputCarNumber();
            policyRequestFormOGPO.inputCarRegistration();
            policyRequestFormOGPO.clickSearchButton();
            policyRequestFormOGPO.getDisplayedCarModelElement()
            .should('have.text', JSONLoader.testData.carModel);
            policyRequestFormOGPO.clickNextButton();

            policyRequestFormOGPO.inputRandomStartDate();
            policyRequestFormOGPO.clickNextButton();

            policyRequestFormOGPO.clickMoreLink();
            policyRequestFormOGPO.randomClickSMSNotifyCheckbox();
            policyRequestFormOGPO.clickCalculateButton();
            policyRequestFormOGPO.clickFamiliarizedCheckbox();
            policyRequestFormOGPO.randomClickMutualCheckbox();
        });

        payTest();
    });
}

module.exports = { userPathOGPO };