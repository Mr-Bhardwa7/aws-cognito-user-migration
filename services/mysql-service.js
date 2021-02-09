const connection = require('./../config/connection')

module.exports = class MysqlService {

    constructor() {
        this.connection = connection;
    }

    getUserCount(callback) {
        this.connection.query('SELECT count(*) AS total from users', (err, rows) => {
            if (err) throw err;
            callback(rows[0].total);
        })
    }

    getUser(limit, offset, callback){
        this.connection.query(`SELECT * FROM users LIMIT ${offset}, ${limit}`, (err, rows) => {
            if (err) throw err;
            callback(rows);
        })
    }

    getUserByCredencial(email, password, callback){
        this.connection.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`, (err, rows) => {
            if (err) throw err;
            callback(rows);
        })
    }

}