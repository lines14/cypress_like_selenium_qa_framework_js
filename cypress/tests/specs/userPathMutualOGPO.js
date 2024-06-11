const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/mutualOGPO/OGPOPage');
const SMSVerificationPage = require('../pageObjects/SMSVerificationPage');
const mutualOGPOStep1 = require('../pageObjects/mutualOGPO/mutualOGPOStep1');
const mutualOGPOStep2 = require('../pageObjects/mutualOGPO/mutualOGPOStep2');
const mutualOGPOStep3 = require('../pageObjects/mutualOGPO/mutualOGPOStep3');
const mutualOGPOStep4 = require('../pageObjects/mutualOGPO/mutualOGPOStep4');
const mutualOGPOStep5 = require('../pageObjects/mutualOGPO/mutualOGPOStep5');
const NodeEvents = require('../../support/nodeEvents');
const JSONLoader = require('../../main/utils/data/JSONLoader');

exports.userPathMutualOGPO = () => {
  it('OGPO & Mutual user path:', { scrollBehavior: false }, () => {
    cy.open('/');
    mainPage.pageIsDisplayed().should('be.true');
    mainPage.clickGetInsuredButton();
    mainPage.clickTransportButton();
    mainPage.clickOGPOLink();

    OGPOPage.pageIsDisplayed().should('be.true');
    OGPOPage.clickPurchaseButton();

    SMSVerificationPage.pageIsDisplayed().should('be.true');
    SMSVerificationPage.inputPhone(JSONLoader.testData.clientPhoneOGPO.slice(1));
    SMSVerificationPage.clickNextButton();

    SMSVerificationPage.getSMSCodeBoxElement().should('be.visible')
      .then(() => NodeEvents.getLastCodeFromDB(JSONLoader.testData.clientPhoneOGPO))
      .then((code) => SMSVerificationPage.enterSMSCode(code));

    mutualOGPOStep1.inputIIN();
    mutualOGPOStep1.inputEmail();
    mutualOGPOStep1.clickNextButton();

    mutualOGPOStep2.inputAddress();
    mutualOGPOStep2.getSelectedClientName()
      .then((selectedName) => mutualOGPOStep2.getTrimmedDisplayedClientName()
        .should('be.equal', selectedName));
    mutualOGPOStep2.clickSaveButton();
    mutualOGPOStep2.clickNextButton();

    mutualOGPOStep3.inputCarNumber();
    mutualOGPOStep3.inputCarRegistration();
    mutualOGPOStep3.clickSearchButton();
    mutualOGPOStep3.getTrimmedDisplayedCarNumber()
      .should('be.equal', JSONLoader.testData.carNumber);
    mutualOGPOStep3.getSelectedCarModel()
      .should('be.equal', JSONLoader.testData.carModel);
    mutualOGPOStep3.getSelectedCarManufacturedYearElement()
      .should('contain', JSONLoader.testData.carManufacturedYear);
    mutualOGPOStep3.clickNextButton();

    mutualOGPOStep4.inputRandomStartDate();
    mutualOGPOStep4.getDisplayedDate()
      .then((displayedDate) => mutualOGPOStep4.getSelectedDate()
        .should('be.equal', displayedDate));
    mutualOGPOStep4.clickNextButton();

    mutualOGPOStep5.clickMoreLink();
    mutualOGPOStep5.randomClickSMSNotifyCheckbox();
    mutualOGPOStep5.clickCalculateButton();
    mutualOGPOStep5.clickFamiliarizedCheckbox();
    mutualOGPOStep5.clickMutualCheckboxes();
    mutualOGPOStep5.getSumToPay().then((sum) => {
      cy.setLocalStorage('sumToPay', sum);
      mutualOGPOStep5.getTotalCostWithMutual()
        .should('be.equal', Number(sum));
    });
  });
};
