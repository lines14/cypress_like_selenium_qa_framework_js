const moment = require('moment');
const DatabaseUtils = require('../../main/utils/DB/databaseUtils.js');

class NotificationDB extends DatabaseUtils {
    constructor() {
        super(
            '127.0.0.1' || process.env.DB_HOST,
            'root' || process.env.DB_USER,
            'root' || process.env.DB_PASSWORD,
            'notification' || process.env.DB_DATABASE,
            '33090' || process.env.DB_PORT,
            );
    }

    async getLastCode() {
        let id = (await this.sqlSelect('phone_verification', 'id', 'ORDER BY `created_at` DESC LIMIT 1')).pop().id;
        const idIncrement = id++;
        do {
            id = (await this.sqlSelect('phone_verification', 'id', 'ORDER BY `created_at` DESC LIMIT 1')).pop().id;
        } while (id === idIncrement);

        return (await this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')).pop().code;
    }
}

module.exports = new NotificationDB();