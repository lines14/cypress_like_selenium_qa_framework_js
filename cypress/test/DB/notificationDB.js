const path = require('path');
const moment = require('moment');
const logger = require('../../main/utils/log/logger');
const jsonStringifySafe = require('json-stringify-safe');
const DatabaseUtils = require('../../main/utils/DB/databaseUtils');
const configManager = require('../../main/utils/data/configManager');
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
        const lastLogStepUnix = moment((await logger.getTimings()).pop(), configManager.getConfigData().logTimeStampFormat).unix();
        const getLastTimeStampUnix = async () => {
            const response = await this.sqlSelect('phone_verification', 'created_at', 'ORDER BY `created_at` DESC LIMIT 1');
            return moment(response.rows.pop().created_at, configManager.getConfigData().DBTimeStampFormat).unix();
        }

        while (true) {
            const lastTimeStampUnix = await getLastTimeStampUnix();
            if (lastTimeStampUnix >= lastLogStepUnix) {
                return JSON.parse(jsonStringifySafe(await this.sqlSelect('phone_verification', 'code', 'ORDER BY `created_at` DESC LIMIT 1')));
            }
        }
    }
}

module.exports = new NotificationDB();