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

    async getLastRecordCode(createdTime) {
        return (await this.sqlSelect('phone_verification', 'created_at', 'ORDER BY `created_at` DESC LIMIT 1')).pop().created_at;
        // do {
        //     return (await this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')).pop().code;
        // } while (((await this.sqlSelect('phone_verification', 'created_at', 'ORDER BY `created_at` DESC LIMIT 1')).pop().created_at) !== createdTime);
    }
}

module.exports = new NotificationDB();