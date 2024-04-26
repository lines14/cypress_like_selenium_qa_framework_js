const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const { kaspiPay } = require('./kaspiPay');

describe('OGPO + Mutual test suite:', () => {
  userPathMutualOGPO();
  kaspiPay();
});