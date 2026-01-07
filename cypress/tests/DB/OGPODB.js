const path = require('path');
const { Op, Sequelize } = require('sequelize');
const BaseDB = require('../../main/utils/DB/baseDB');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Logger = require('../../main/utils/log/logger');
const Policy = require('./models/policy');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class OGPODB extends BaseDB {
  constructor() {
    super(process.env.DB_OGPO_DATABASE);
    this.Policy = Policy(this.sequelize);
  }

  async getActiveOGPOPolicies() {
    const quantity = JSONLoader.testData.quantityOfPoliciesToGetFromDB;

    const records = await this.Policy.findAll({
      where: {
        status: JSONLoader.dictPolicyStatus.issued,
        date_beg: { [Op.lt]: Sequelize.literal('NOW()') },
        date_end: { [Op.gt]: Sequelize.literal('NOW()') },
      },
      order: [['id', 'DESC']],
      limit: quantity,
      raw: true,
    });

    Logger.log(`[inf]   active OGPO policies retrieved from DB! quantity: ${records.length}`);
    return records;
  }
}

module.exports = new OGPODB();
