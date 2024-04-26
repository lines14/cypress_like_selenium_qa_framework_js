const { userPathMST } = require('./userPathMST');
const { kaspiPay } = require('./kaspiPay');

describe('MST with Kaspi pay test suite:', () => {
  userPathMST();
  kaspiPay();
});
