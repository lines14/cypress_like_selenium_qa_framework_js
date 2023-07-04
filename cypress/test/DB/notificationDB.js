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

    getLastRecordCode() {
        return (this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')).pop().code;
    }
}

module.exports = new NotificationDB();