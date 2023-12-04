const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOPage');
const policyRequestFormMutualOGPO = require('../pageObjects/policyRequestFormMutualOGPO');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

const userPathMutualOGPO = (payTest) => {
    describe('OGPO + Mutual smoke test:', () => {    
        it('OGPO + Mutual client path:', { scrollBehavior: false }, () => {
            cy.open('/');
            mainPage.pageIsDisplayed().should('be.true');
            mainPage.clickGetInsuredButton();
            mainPage.clickTransportButton();
            mainPage.clickOGPOLink();

            OGPOPage.pageIsDisplayed().should('be.true');
            OGPOPage.clickPurchaseButton();

            policyRequestFormMutualOGPO.pageIsDisplayed().should('be.true');
            policyRequestFormMutualOGPO.inputPhone();
            policyRequestFormMutualOGPO.clickNextButton();

            policyRequestFormMutualOGPO.getSMSCodeBoxElement().should('be.visible')
            .then(() => NodeEvents.getLastCodeFromDB())
            .then((code) => policyRequestFormMutualOGPO.enterSMSCode(code));

            policyRequestFormMutualOGPO.inputIIN();
            policyRequestFormMutualOGPO.inputEmail();
            policyRequestFormMutualOGPO.inputAddress();
            policyRequestFormMutualOGPO.clickNextButton();

            policyRequestFormMutualOGPO.getSelectedClientName()
            .then((selectedName) => policyRequestFormMutualOGPO.getTrimmedDisplayedClientName()
            .should('be.equal', selectedName));
            policyRequestFormMutualOGPO.clickSaveButton();
            policyRequestFormMutualOGPO.clickNextButton();

            policyRequestFormMutualOGPO.inputCarNumber();
            policyRequestFormMutualOGPO.inputCarRegistration();
            policyRequestFormMutualOGPO.clickSearchButton();
            policyRequestFormMutualOGPO.getTrimmedDisplayedCarNumber()
            .should('be.equal', JSONLoader.testData.carNumber);
            policyRequestFormMutualOGPO.getSelectedCarModel()
            .should('be.equal', JSONLoader.testData.carModel);
            policyRequestFormMutualOGPO.getSelectedCarManufacturedYearElement()
            .should('contain', JSONLoader.testData.carManufacturedYear);
            policyRequestFormMutualOGPO.clickNextButton();

            policyRequestFormMutualOGPO.inputRandomStartDate();
            policyRequestFormMutualOGPO.getDisplayedDate()
            .then((displayedDate) => policyRequestFormMutualOGPO.getSelectedDate()
            .should('be.equal', displayedDate));
            policyRequestFormMutualOGPO.clickNextButton();

            policyRequestFormMutualOGPO.clickMoreLink();
            policyRequestFormMutualOGPO.randomClickSMSNotifyCheckbox();
            policyRequestFormMutualOGPO.clickCalculateButton();
            policyRequestFormMutualOGPO.clickFamiliarizedCheckbox();
            policyRequestFormMutualOGPO.clickMutualCheckboxes();
            policyRequestFormMutualOGPO.getSumToPay().then((sum) => {
                cy.setLocalStorage('sumToPay', sum);
                policyRequestFormMutualOGPO.getTotalCostWithMutual()
                .should('be.equal', Number(sum));
            });
        });

        payTest();
    });
}

module.exports = { userPathMutualOGPO };