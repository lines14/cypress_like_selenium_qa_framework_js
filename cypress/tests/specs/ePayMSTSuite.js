const { userPathMST } = require('./userPathMST');
const { ePay } = require('./ePay');

describe('MST with Epay test suite:', () => {
  userPathMST({ kaspiPay: false });
  ePay();
});
