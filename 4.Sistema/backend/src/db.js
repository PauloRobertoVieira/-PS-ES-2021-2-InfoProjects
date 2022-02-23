const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'prv',
    password: process.env.DB_PWD || 'admin1234',
    database: process.env.DB_NAME || 'prv_system'
});

connection.connect();

function query(sql, cb, values = {}) {

    connection.query(sql, values, function (error, results, fields) {
        if (error) throw error;
        cb(results);
    });

    //connection.end();
}

module.exports = { query }