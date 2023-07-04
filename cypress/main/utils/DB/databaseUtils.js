const mysql = require('mysql2');
const logger = require('../log/logger.js');

class DatabaseUtils {
    constructor(host, user, password, database, port) {
        logger.log(`[info] ▶ connect to ${database} database`);
        mysql.createConnection({
            host,
            user,
            password,
            database,
            port,
        }).then((conn) => {
            this.connection = conn;
        });
    }

    closeConnection() {
        logger.log(`[info] ▶ close connection to database`);
        this.connection.end();
    }

    sqlQuery(query, values, log) {
        logger.log(log);
        const [rows] = this.connection.query(query, [values]);
        return rows;
    }

    sqlSelect(tableName, target='*', conditions='', values=[]) {
        const log = `[info] ▶ select data from ${tableName} table`;
        const query =`SELECT ${target} FROM ${tableName} ${conditions};`;
        return this.sqlQuery(query, values, log);
    }

    sqlInsert(tableName, dataObject) {
        const log = `[info] ▶ insert data to ${tableName} table`;
        const columnNames = Object.keys(dataObject);
        const values = Object.values(dataObject);
        const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (?)`;
        return this.sqlQuery(query, values, log);
    }

    sqlReplace(tableName, dataObject) {
        const log = `[info] ▶ replace data in ${tableName} table`;
        const columnNames = Object.keys(dataObject);
        const values = Object.values(dataObject);
        const query = `REPLACE INTO ${tableName} (${columnNames}) VALUES (?)`;
        this.sqlQuery(query, values, log);
    }

    sqlDelete(tableName, conditions='', values=[]) {
        const log = `[info] ▶ delete data from ${tableName} table`;
        const query =`DELETE FROM ${tableName} ${conditions};`;
        this.sqlQuery(query, values, log);
    }

    sqlUpdate(tableName, target='*', conditions='', values=[]) {
        const log = `[info] ▶ update data in ${tableName} table`;
        const query =`UPDATE ${tableName} SET ${target} ${conditions};`;
        this.sqlQuery(query, values, log);
    }
}

module.exports = DatabaseUtils;