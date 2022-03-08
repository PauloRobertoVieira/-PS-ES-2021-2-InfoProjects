const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'prv',
    password: process.env.DB_PWD || 'admin1234',
    database: process.env.DB_NAME || 'prv_system'
});


function query(sql, values = {}) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, function (error, results, fields) {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                resolve(results);
            }
        });
    })
}

module.exports = { query }