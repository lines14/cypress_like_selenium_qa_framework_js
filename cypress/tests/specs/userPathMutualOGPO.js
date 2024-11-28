const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/mutualOGPO/OGPOPage');
const SMSVerificationPage = require('../pageObjects/SMSVerificationPage');
const mutualOGPOStep1 = require('../pageObjects/mutualOGPO/mutualOGPOStep1');
const mutualOGPOStep2 = require('../pageObjects/mutualOGPO/mutualOGPOStep2');
const mutualOGPOStep3 = require('../pageObjects/mutualOGPO/mutualOGPOStep3');
const mutualOGPOStep4 = require('../pageObjects/mutualOGPO/mutualOGPOStep4');
const mutualOGPOStep5 = require('../pageObjects/mutualOGPO/mutualOGPOStep5');
const NodeEvents = require('../../support/nodeEvents');

exports.userPathMutualOGPO = (holder, car) => {
  it('OGPO & Mutual user path:', { scrollBehavior: false }, () => {
    NodeEvents.resetClient(holder)
      .then(async (response) => cy.wrap(response.status).should('be.equal', 200));

    cy.open('/');
    mainPage.pageIsDisplayed().should('be.true');
    mainPage.clickGetInsuredButton();
    mainPage.clickTransportButton();
    mainPage.clickOGPOLink();

    OGPOPage.pageIsDisplayed().should('be.true');
    OGPOPage.clickPurchaseButton();

    SMSVerificationPage.pageIsDisplayed().should('be.true');
    SMSVerificationPage.inputPhone(holder.phoneTrimmed.OGPO);
    SMSVerificationPage.clickNextButton();

    SMSVerificationPage.getSMSCodeBoxElement().should('be.visible')
      .then(() => NodeEvents.getLastCodeFromDB(holder.phone.OGPO))
      .then((code) => SMSVerificationPage.enterSMSCode(code));

    mutualOGPOStep1.pageIsDisplayed().should('be.true');
    // mutualOGPOStep1.waitIINBoxIsDisplayed()
    //   .then(() => NodeEvents.toggleVerification()
    //     .then(() => NodeEvents.getVerifyBool()))
    // .then(() => mutualOGPOStep1.inputIIN())));
    mutualOGPOStep1.inputIIN(holder.iin);
    mutualOGPOStep1.inputEmail(holder.email);
    mutualOGPOStep1.inputAddress(holder.address);
    mutualOGPOStep1.clickNextButton();

    mutualOGPOStep2.getSelectedClientName()
      .then((selectedName) => mutualOGPOStep2.getTrimmedDisplayedClientName()
        .should('be.equal', selectedName));
    mutualOGPOStep2.clickSaveButton();
    mutualOGPOStep2.clickNextButton();

    // NodeEvents.toggleVerification({ fromConfig: false, value: true })
    //   .then(() => NodeEvents.getVerifyBool()
    //     .then(() => mutualOGPOStep3.inputCarNumber()));
    mutualOGPOStep3.inputCarNumber(car.reg_num);
    mutualOGPOStep3.inputCarRegNumber(car.reg_cert_num);
    mutualOGPOStep3.clickSearchButton();
    mutualOGPOStep3.getTrimmedDisplayedCarNumber()
      .should('be.equal', car.reg_num);
    mutualOGPOStep3.getSelectedCarMarkAndModel()
      .should('be.equal', `${car.mark} ${car.model}`);
    mutualOGPOStep3.getSelectedCarManufacturedYearElement()
      .should('contain', car.year);
    mutualOGPOStep3.clickNextButton();

    mutualOGPOStep4.inputRandomStartDate();
    mutualOGPOStep4.getDisplayedDate()
      .then((displayedDate) => mutualOGPOStep4.getSelectedDate()
        .should('be.equal', displayedDate));
    mutualOGPOStep4.clickNextButton();

    // NodeEvents.toggleVerification()
    //   .then(() => NodeEvents.getVerifyBool()
    //     .then(() => mutualOGPOStep5.clickMoreLink()));
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
