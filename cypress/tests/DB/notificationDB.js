const path = require('path');
const BaseDB = require('../../main/utils/DB/baseDB');
const PhoneVerification = require('./models/phoneVerification');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class NotificationDB extends BaseDB {
  constructor() {
    super(process.env.DB_NOTIFICATION_DATABASE);
    this.PhoneVerification = PhoneVerification(this.sequelize);
  }

  async getLastCode(phone) {
    const target = 'code';

    const record = await this.PhoneVerification.findOne({
      where: { phone },
      attributes: [target],
      order: [['created_at', 'DESC']],
    });

    const result = record?.[target];
    const logs = [`[inf]   ${target} contains: "${result}"`];
    return { logs, result };
  }
}

module.exports = new NotificationDB();
