const mysql = require('mysql2/promise');


class BaseModel {
	pool = mysql.createPool({
	    host: process.env.DB_HOST,
	    user: process.env.DB_NAME,
	    password: process.env.DB_PASSWD,
	    database: process.env.DB_NAME,
	    waitForConnections: true,
	    connectionLimit: 2,
	    queueLimit: 0,
	    debug: false
	});

    async _query(sql, params) {
        const [rows, fields] = await this.pool.execute(sql);

        return rows;
    };
}

module.exports = BaseModel;