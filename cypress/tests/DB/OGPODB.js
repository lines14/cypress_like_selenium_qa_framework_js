const path = require('path');
const BaseDB = require('../../main/utils/DB/baseDB');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const Logger = require('../../main/utils/log/logger');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class OGPODB extends BaseDB {
  constructor() {
    super(
      process.env.DB_HOST,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      process.env.DB_OGPO_DATABASE,
      process.env.DB_PORT,
    );
  }

  async getActiveOGPOPolicies() {
    const quantity = JSONLoader.testData.quantityOfPoliciesToGetFromDB;
    const response = await this.sqlSelect(
      'policies',
      '*',
      'WHERE status = 8 and date_beg < NOW() and date_end > NOW() ORDER BY `id` DESC LIMIT ?',
      [quantity],
    );
    Logger.log(`[inf]   active OGPO policies retrieved from DB! quantity: ${response.rows.length}`);
    return response.rows;
  }
}

module.exports = new OGPODB();
