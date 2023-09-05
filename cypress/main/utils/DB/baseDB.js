const mysql = require('mysql2/promise');

class BaseDB {
    #host;
    #user;
    #port;
    #password;
    #database;
    #connection;

    constructor(host, user, password, database, port) {
        this.#host = host;
        this.#user = user;
        this.#password = password;
        this.#database = database;
        this.#port = port;
    }

    async createConnection() {
        const logs = [`[info] ▶ connect to ${this.#database} database`];
        this.#connection = await mysql.createConnection({ 
            host: this.#host, 
            user: this.#user,
            password: this.#password, 
            database: this.#database, 
            port: this.#port, 
        });
        return { logs }
    }

    async closeConnection() {
        const logs = [`[info] ▶ close connection to database`];
        await this.#connection.end();
        return { logs }
    }

    async sqlQuery(query, values) {
        const [rows] = await this.#connection.query(query, [values]);
        return rows
    }

    async sqlSelect(tableName, target='*', conditions='', values=[]) {
        const logs = [`[info] ▶ select ${target} from ${tableName} table`];
        const query =`SELECT ${target} FROM ${tableName} ${conditions};`;
        const rows = await this.sqlQuery(query, values);
        logs.push(`[info]   ${target} contains: "${rows[0][target]}"`)
        return { rows, logs }
    }
}

module.exports = BaseDB;