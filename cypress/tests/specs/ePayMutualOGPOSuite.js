const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const { ePay } = require('./ePay');

describe('OGPO & Mutual with Epay test suite:', () => {
  userPathMutualOGPO({ kaspiPay: false });
  ePay();
});
