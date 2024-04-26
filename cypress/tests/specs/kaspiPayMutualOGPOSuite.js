const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const { kaspiPay } = require('./kaspiPay');

describe('OGPO & Mutual with Kaspi pay test suite:', () => {
  userPathMutualOGPO();
  kaspiPay();
});
