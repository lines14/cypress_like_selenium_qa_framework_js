const mainPage = require('../pageObjects/mainPage');
const OGPOPage = require('../pageObjects/OGPOMutual/OGPOPage');
const SMSVerificationPage = require('../pageObjects/SMSVerificationPage');
const OGPOMutualStep1 = require('../pageObjects/OGPOMutual/OGPOMutualStep1');
const OGPOMutualStep2 = require('../pageObjects/OGPOMutual/OGPOMutualStep2');
const OGPOMutualStep3 = require('../pageObjects/OGPOMutual/OGPOMutualStep3');
const OGPOMutualStep4 = require('../pageObjects/OGPOMutual/OGPOMutualStep4');
const OGPOMutualStep5 = require('../pageObjects/OGPOMutual/OGPOMutualStep5');
const NodeEvents = require('../../support/nodeEvents');

exports.userPathOGPOMutual = (holder, insured, car) => {
  it('OGPO & Mutual user path:', { scrollBehavior: false }, () => {
    NodeEvents.resetClient(holder).then((responses) => {
      responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
    });
    NodeEvents.resetClient(insured).then((responses) => {
      responses.forEach((response) => cy.wrap(response.status).should('be.equal', 200));
    });

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

    OGPOMutualStep1.pageIsDisplayed().should('be.true');
    OGPOMutualStep1.inputIIN(holder.iin);
    OGPOMutualStep1.waitCheckboxWillDriveCarIsDisplayed();
    OGPOMutualStep1.inputLastName(holder.last_name);
    OGPOMutualStep1.inputFirstName(holder.first_name);
    OGPOMutualStep1.inputMiddleName(holder.middle_name);
    OGPOMutualStep1.inputBornDate(holder.born.DMY);
    OGPOMutualStep1.selectSex(holder.sex);
    OGPOMutualStep1.selectDocumentType(holder.document_type);
    OGPOMutualStep1.inputDocumentNumber(holder.document_number);
    OGPOMutualStep1.selectRandomDocumentGivedBy();
    OGPOMutualStep1.inputDocumentGivedDate(holder.document_gived_date.DMY);
    OGPOMutualStep1.inputEmail(holder.email);
    OGPOMutualStep1.inputAddress(holder.address);
    OGPOMutualStep1.clickCheckboxWillDriveCar();
    OGPOMutualStep1.clickNextButton();

    OGPOMutualStep2.waitSaveButtonIsDisplayed();
    OGPOMutualStep2.inputIIN(insured.iin);
    OGPOMutualStep2.getSelectedClientName()
      .then((selectedName) => OGPOMutualStep2.getTrimmedDisplayedClientName()
        .should('be.equal', selectedName));
    OGPOMutualStep2.getOrSetLastName(insured.last_name);
    OGPOMutualStep2.getOrSetFirstName(insured.first_name);
    OGPOMutualStep2.inputMiddleName(insured.middle_name);
    OGPOMutualStep2.inputBornDate(insured.born.DMY);
    OGPOMutualStep2.selectSex(insured.sex);
    OGPOMutualStep2.getOrSelectDocumentType(insured.document_type);
    OGPOMutualStep2.getOrSetDocumentNumber(insured.document_number);
    OGPOMutualStep2.getOrSetDocumentGivedDate(insured.document_gived_date.DMY);
    OGPOMutualStep2.getOrSetDrivingLicense(insured.driving_license);
    OGPOMutualStep2.getOrSetIssueLicenseDate(insured.date_issue_license.DMY);
    OGPOMutualStep2.getOrSelectRandomDocumentGivedBy();
    OGPOMutualStep2.inputAddress(insured.address);
    OGPOMutualStep2.clickSaveButton();
    OGPOMutualStep2.clickNextButton();

    OGPOMutualStep3.inputCarNumber(car.reg_num);
    OGPOMutualStep3.inputCarRegNumber(car.reg_cert_num);
    OGPOMutualStep3.clickSearchButton();
    OGPOMutualStep3.getTrimmedDisplayedCarNumber()
      .should('be.equal', car.reg_num);
    OGPOMutualStep3.getSelectedCarMarkAndModel()
      .should('be.equal', `${car.mark} ${car.model}`);
    OGPOMutualStep3.getSelectedCarManufacturedYearElement()
      .should('contain', car.year);
    OGPOMutualStep3.clickNextButton();

    OGPOMutualStep4.inputRandomStartDate();
    OGPOMutualStep4.getDisplayedDate()
      .then((displayedDate) => OGPOMutualStep4.getSelectedDate()
        .should('be.equal', displayedDate));
    OGPOMutualStep4.clickNextButton();

    OGPOMutualStep5.clickMoreLink();
    OGPOMutualStep5.randomClickSMSNotifyCheckbox();
    OGPOMutualStep5.clickCalculateButton();
    OGPOMutualStep5.clickFamiliarizedCheckbox();
    OGPOMutualStep5.clickMutualCheckboxes();
    OGPOMutualStep5.getSumToPay().then((sum) => {
      cy.setLocalStorage('sumToPay', sum);
      OGPOMutualStep5.getTotalCostWithMutual()
        .should('be.equal', Number(sum));
    });
  });
};
