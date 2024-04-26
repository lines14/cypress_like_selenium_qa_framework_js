const { userPathMutualOGPO } = require('./userPathMutualOGPO');
const { kaspiPayMutualOGPO } = require('./kaspiPayMutualOGPO');

describe('OGPO + Mutual test suite:', () => {
  userPathMutualOGPO();
  kaspiPayMutualOGPO();
});