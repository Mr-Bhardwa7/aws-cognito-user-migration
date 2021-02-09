const mysql = require('mysql');
const env = require('./../env');

const connection = mysql.createConnection({
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.database,
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = connection;