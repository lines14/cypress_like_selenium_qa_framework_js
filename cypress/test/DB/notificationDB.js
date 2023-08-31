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
        let id = (await this.sqlSelect('phone_verification', 'id', 'ORDER BY `created_at` DESC LIMIT 1')).rows.pop().id;
        const idIncrement = id++;
        for (let counter = 0; counter < 10; counter++) {
            id = (await this.sqlSelect('phone_verification', 'id', 'ORDER BY `created_at` DESC LIMIT 1')).rows.pop().id;
            if (id === idIncrement) break;
        }

        return JSON.parse(jsonStringifySafe(await this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')));
    }
}

module.exports = new NotificationDB();