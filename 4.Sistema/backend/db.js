const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'prv',
    password: 'admin1234',
    database: 'prv_system'
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