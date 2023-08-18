const path = require('path');
const jsonStringifySafe = require('json-stringify-safe');
const DatabaseUtils = require('../../main/utils/DB/databaseUtils');
require('dotenv').config({ path: path.join(__dirname, '../../', '.env.test'), override: true });

class NotificationDB extends DatabaseUtils {
    constructor() {
        super(
            '127.0.0.1' || process.env.DB_HOST,
            'root' || process.env.DB_USERNAME,
            'root' || process.env.DB_PASSWORD,
            'notification' || process.env.DB_DATABASE,
            '33090' || process.env.DB_PORT,
            );
    }

    async getLastCode() {
        let id = (await this.sqlSelect('phone_verification', 'id', 'ORDER BY `created_at` DESC LIMIT 1')).rows.pop().id;
        const idIncrement = id++;
        do {
            id = (await this.sqlSelect('phone_verification', 'id', 'ORDER BY `created_at` DESC LIMIT 1')).rows.pop().id;
        } while (id === idIncrement);

        return JSON.parse(jsonStringifySafe(await this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')));
    }
}

module.exports = new NotificationDB();