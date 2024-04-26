const { userPathMST } = require('./userPathMST');
const { kaspiPay } = require('./kaspiPay');

describe('MST test suite:', () => {
  userPathMST();
  kaspiPay();
});