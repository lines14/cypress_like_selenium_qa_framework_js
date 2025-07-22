const path = require('path');
const moment = require('moment/moment');
const authAPI = require('./authAPI');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const TimeUtils = require('../../main/utils/time/timeUtils');
const Randomizer = require('../../main/utils/random/randomizer');
const DataUtils = require('../../main/utils/data/dataUtils');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class OnesAPI extends BaseAPI {
  #API;

  #options;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
  }) {
    super(options);
    this.#options = options;
  }

  async setToken() {
    const response = await authAPI.auth({ APIName: 'Ones API' });
    this.#options.headers = {};
    this.#options.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    this.#API = new OnesAPI(this.#options);
  }

  /* eslint camelcase:
  ["error", {allow: ["num_policy", "valid_policy", "date_begin", "date_end"]}] */
  async getActivePoliciesWithSpecifiedInsProducts(
    {
      attemptCountArg, IIN, date_begin, date: date_end,
    } = {},
  ) {
    if (attemptCountArg >= JSONLoader.testData.activePoliciesRequestAttemptsNumber) {
      throw new Error(`[err]   active policies retrieval request didn't succeed after ${JSONLoader.testData.activePoliciesRequestAttemptsNumber} attempts!`);
    }
    const attemptCount = attemptCountArg ? attemptCountArg + 1 : 1;
    console.log('[INFO] Active policies retrieval initiated!');
    const { firstDay, lastDay } = TimeUtils.getFirstAndLastDateOfPrevMonth();
    const randomIIN = Randomizer.getRandomArrayElement(
      DataUtils.filterClients(JSONLoader.testClients, { isJuridical: false }),
    ).iin;
    const params = {
      methodName: 'GetPolicy_2025_Test',
      params: {
        iin: IIN || randomIIN.toString(),
        valid_policy: 1,
        date_begin: date_begin || firstDay.format(JSONLoader.testData.datesFormatYMD),
        date: date_end || lastDay.format(JSONLoader.testData.datesFormatYMD),
      },
    };
    console.log(`[INFO] params: ${JSON.stringify(params)}`);
    const response = await this.#API.post(JSONLoader.APIEndpoints.ones.callMethod, params);
    // If request didn't succeed, retry.
    if (response.status !== 200) {
      console.log('[INFO] Active policies request didn\'t succeed! Attempting again!');
      return this.getActivePoliciesWithSpecifiedInsProducts({ attemptCountArg: attemptCount });
    }
    // Filtering policies by ins product and date begin and date end to ensure
    // correct policies are present. If no policies left after filtering, retry.
    const currentDate = moment().format(JSONLoader.testData.datesFormatDMY);
    const filteredPolicies = response.data.contracts
      .filter((policy) => policy.ins_product === JSONLoader.testData.insProductsForClaimTests.OGPO
      && moment(policy.date_begin, JSONLoader.testData.datesFormatDMY)
        .isSameOrBefore(moment(currentDate, JSONLoader.testData.datesFormatDMY))
      && moment(policy.date_end, JSONLoader.testData.datesFormatDMY)
        .isSameOrAfter(moment(currentDate, JSONLoader.testData.datesFormatDMY)));
    if (!filteredPolicies.length) {
      console.log('[INFO] No policies left after filtering! Attempting request again!');
      return this.getActivePoliciesWithSpecifiedInsProducts({ attemptCountArg: attemptCount });
    }

    console.log('[INFO] Active policies retrieval successfully finished!');
    return filteredPolicies;
  }
}

module.exports = new OnesAPI();
