const path = require('path');
const jsonStringifySafe = require('json-stringify-safe');
const DatabaseUtils = require('../../main/utils/DB/databaseUtils');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class NotificationDB extends DatabaseUtils {
    constructor() {
        super(
            '' || process.env.DB_HOST,
            '' || process.env.DB_USERNAME,
            '' || process.env.DB_PASSWORD,
            '' || process.env.DB_DATABASE,
            '' || process.env.DB_PORT,
            );
    }

    async getLastCode() {
        return JSON.parse(jsonStringifySafe(await this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')));
    }
}

module.exports = new NotificationDB();