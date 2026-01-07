const moment = require('moment');
const { parseStringPromise } = require('xml2js');
const JSONLoader = require('./JSONLoader');
const TimeUtils = require('../time/timeUtils');
const Randomizer = require('../random/randomizer');

class DataUtils {
  static async XMLToJSON(xml) {
    return (await parseStringPromise(xml)).response;
  }

  static getFromRequests(url1, alias1, url2, alias2) {
    cy.intercept(url1).as(alias1);
    cy.intercept(url2).as(alias2);
    return cy.wait([`@${alias1}`, `@${alias2}`]).then(([interception1, interception2]) => [interception1.response.body, interception2.response.body]);
  }

  static getFromRequest(url, alias) {
    cy.intercept(url).as(alias);
    return cy.wait(`@${alias}`).then((interception) => interception.response.body);
  }

  /**
   * requires one mandatory argument: clients.
   * options contain optional parameters:
   * residency,
   * type of document being passport,
   * having driver license
   * and being under 60 years old:
   * @param {string[]} clients
   * @param {Object} options
   * @param {boolean} options.isResident
   * @param {boolean} options.hasPassport
   * @param {boolean} options.hasDriverLicence
   * @param {boolean} options.isUnderSixtyYearsOld
   */
  static filterClients(clients, options = {}) {
    const { isResident } = options;
    const { hasPassport } = options;
    const { hasDriverLicence } = options;
    const { isUnderSixtyYearsOld } = options;
    const { isJuridical } = options;
    let filteredClients = [...clients];

    filteredClients = filteredClients.filter((client) => {
      if (isResident !== undefined) {
        return isResident ? client.resident_bool : !client.resident_bool;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasDriverLicence !== undefined) {
        return hasDriverLicence ? client.driving_license : !client.driving_license;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasPassport !== undefined) {
        const hasLetter = /[a-zA-Z]/.test(client.document_number);
        return hasPassport
          ? client.document_type_id === 11 && hasLetter
          : client.document_type_id !== 11;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (isUnderSixtyYearsOld !== undefined) {
        return isUnderSixtyYearsOld
          ? moment(client.born) > moment().subtract(60, 'years')
          : moment(client.born) <= moment().subtract(60, 'years');
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (isJuridical !== undefined) {
        return isJuridical ? !client.natural_person_bool : client.natural_person_bool;
      }

      return true;
    });

    return filteredClients;
  }

  static createRandomCarStructure(carsArr) {
    const randomCarIndex = Randomizer.getRandomInteger(carsArr.length - 1);
    const tempCar = carsArr[randomCarIndex];
    const resultCar = { ...tempCar };

    resultCar.dt_reg_cert = {};
    resultCar.dt_reg_cert.YMD = tempCar.dt_reg_cert;
    resultCar.dt_reg_cert.DMY = TimeUtils.reformatDateFromYMDToDMY(tempCar.dt_reg_cert);

    resultCar.year = tempCar.year.toString();
    resultCar.engine_volume = tempCar.engine_volume.toString();

    resultCar.region_id = JSONLoader.testData.carRegion;

    return resultCar;
  }

  static createRandomClientsStructures(clientsArr) {
    const randomHolderIndex = Randomizer.getRandomInteger(clientsArr.length - 1);
    let randomInsuredIndex;
    if (clientsArr.length >= 2) {
      do {
        randomInsuredIndex = Randomizer.getRandomInteger(clientsArr.length - 1);
      } while (randomInsuredIndex === randomHolderIndex);
    } else {
      randomInsuredIndex = randomHolderIndex;
    }

    const tempHolder = clientsArr[randomHolderIndex];
    const tempInsured = clientsArr[randomInsuredIndex];
    const resultHolder = { ...tempHolder };
    const resultInsured = { ...tempInsured };

    resultHolder.document_gived_date = {};
    resultHolder.document_gived_date.YMD = tempHolder.document_gived_date;
    resultHolder.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempHolder.document_gived_date);
    resultHolder.born = {};
    resultHolder.born.YMD = tempHolder.born;
    resultHolder.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempHolder.born);
    resultHolder.date_issue_license = {};
    resultHolder.date_issue_license.YMD = tempHolder.date_issue_license;
    resultHolder.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempHolder.date_issue_license);

    resultHolder.iin = tempHolder.iin.toString();
    resultHolder.document_type = JSONLoader
      .dictDocumentType[tempHolder.document_type_id.toString()];

    resultHolder.sex = JSONLoader.dictSexID[tempHolder.sex_id];
    resultHolder.address = JSONLoader.testData.holderAddress;
    resultHolder.addressStreet = JSONLoader.testData.insuranceObjectAddressStreet;
    resultHolder.addressHouseNumber = JSONLoader.testData.insuranceObjectAddressHouseNumber;
    resultHolder.addressApartmentNumber = JSONLoader.testData.insuranceObjectAddressApartmentNumber;
    resultHolder.email = JSONLoader.testData.holderEmail;
    resultHolder.phone = {};
    resultHolder.phone.MST = JSONLoader.testData.holderPhoneMST;
    resultHolder.phone.OGPO = JSONLoader.testData.holderPhoneOGPO;
    resultHolder.phone.shanyrak = JSONLoader.testData.holderPhoneShanyrak;
    resultHolder.phoneTrimmed = {};
    resultHolder.phoneTrimmed.MST = JSONLoader.testData.holderPhoneMST.slice(1);
    resultHolder.phoneTrimmed.OGPO = JSONLoader.testData.holderPhoneOGPO.slice(1);
    resultHolder.phoneTrimmed.shanyrak = JSONLoader.testData.holderPhoneShanyrak.slice(1);

    resultInsured.document_gived_date = {};
    resultInsured.document_gived_date.YMD = tempInsured.document_gived_date;
    resultInsured.document_gived_date.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempInsured.document_gived_date);
    resultInsured.born = {};
    resultInsured.born.YMD = tempInsured.born;
    resultInsured.born.DMY = TimeUtils.reformatDateFromYMDToDMY(tempInsured.born);
    resultInsured.date_issue_license = {};
    resultInsured.date_issue_license.YMD = tempInsured.date_issue_license;
    resultInsured.date_issue_license.DMY = TimeUtils
      .reformatDateFromYMDToDMY(tempInsured.date_issue_license);

    resultInsured.iin = tempInsured.iin.toString();
    resultInsured.document_type = JSONLoader
      .dictDocumentType[tempInsured.document_type_id.toString()];

    resultInsured.sex = JSONLoader.dictSexID[tempInsured.sex_id];
    resultInsured.address = JSONLoader.testData.insuredAddress;

    return { holder: resultHolder, insured: resultInsured };
  }

  static prepareSetClientRequestBody(getClientResponse, client) {
    const requestBody = { ...getClientResponse.data.data };
    requestBody.first_name = client.first_name;
    requestBody.middle_name = client.middle_name;
    requestBody.last_name = client.last_name;
    requestBody.first_name_eng = client.first_name_eng;
    requestBody.last_name_eng = client.last_name_eng;
    requestBody.natural_person_bool = client.natural_person_bool;
    requestBody.sex_id = client.sex_id;
    requestBody.born = requestBody.natural_person_bool ? client.born.DMY : null;
    requestBody.resident_bool = client.resident_bool;
    requestBody.document_number = client.document_number;
    requestBody.document_gived_date = client.document_gived_date.DMY;
    requestBody.document_type_id = client.document_type_id;
    requestBody.verify_bool = requestBody.natural_person_bool
      ? Number(JSONLoader.configData.verification) : 0;
    requestBody.verify_type_id = requestBody.verify_bool ? 1 : 3;
    requestBody.activity_kind_id = requestBody.natural_person_bool
      ? 250 : client.activity_kind_id;
    requestBody.economics_sector_id = requestBody.natural_person_bool
      ? 10 : client.economics_sector_id;
    requestBody.juridical_person_name = requestBody.natural_person_bool
      ? '' : client.juridical_person_name;

    return requestBody;
  }

  static prepareRandomizedPolicyData() {
    let OGPOContractForClaim;
    try {
      OGPOContractForClaim = Randomizer.getRandomArrayElement(JSONLoader.activePolicies);
    } catch (e) {
      throw new Error('[err]   no policy for claim found after filter!');
    }

    const policyDateBegin = JSONLoader.configData.getPoliciesForClaimFromDB
      ? TimeUtils.reformatDateFromYMDToDMY(OGPOContractForClaim.date_beg)
      : OGPOContractForClaim.date_begin;
    const policyDateEnd = JSONLoader.configData.getPoliciesForClaimFromDB
      ? TimeUtils.reformatDateFromYMDToDMY(OGPOContractForClaim.date_end)
      : OGPOContractForClaim.date_end;
    const insurancePeriod = `${policyDateBegin} - ${policyDateEnd}`;
    const policyNumber = JSONLoader.configData.getPoliciesForClaimFromDB
      ? OGPOContractForClaim.policy_number
      : OGPOContractForClaim.num_policy;

    return {
      OGPOContractForClaim, policyDateBegin, policyDateEnd, insurancePeriod, policyNumber,
    };
  }
}

module.exports = DataUtils;
