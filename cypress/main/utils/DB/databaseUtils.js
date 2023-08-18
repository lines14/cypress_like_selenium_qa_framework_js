const mysql = require('mysql2/promise');

class DatabaseUtils {
    constructor(host, user, password, database, port) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.port = port;
    }

    async createConnection() {
        const log = `[info] ▶ connect to ${this.database} database`;
        this.connection = await mysql.createConnection({ 
            host: this.host, 
            user: this.user,
            password: this.password, 
            database: this.database, 
            port: this.port, 
        });
        return { log }
    }

    async closeConnection() {
        const log = `[info] ▶ close connection to database`;
        await this.connection.end();
        return { log }
    }

    async sqlQuery(query, values, log) {
        const [rows] = await this.connection.query(query, [values]);
        return { rows, log }
    }

    async sqlSelect(tableName, target='*', conditions='', values=[]) {
        const log = `[info] ▶ select data from ${tableName} table`;
        const query =`SELECT ${target} FROM ${tableName} ${conditions};`;
        return await this.sqlQuery(query, values, log);
    }
}

module.exports = DatabaseUtils;