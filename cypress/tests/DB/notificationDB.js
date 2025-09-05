const path = require('path');
const BaseDB = require('../../main/utils/DB/baseDB');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class NotificationDB extends BaseDB {
  constructor() {
    super(
      process.env.DB_HOST,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      process.env.DB_NOTIFICATION_DATABASE,
      process.env.DB_PORT,
    );
  }

  async getLastCode(phoneNumber) {
    const target = 'code';
    const response = await this.sqlSelect(
      'phone_verification',
      target,
      'WHERE phone IN (?) ORDER BY `created_at` DESC LIMIT 1',
      [phoneNumber],
    );
    response.logs.push(`[inf]   ${target} contains: "${response.rows[0][target]}"`);
    return response;
  }
}

module.exports = new NotificationDB();
