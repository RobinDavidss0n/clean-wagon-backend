const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const mysql = require('mysql2')

const production = process.env.MYSQL_PROUCTION;
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

module.exports = function() {

    const exports = {}

    /**
     * Creates and returns a connection to the (MySQL) database.
     * @returns {object}
     */
    exports.getConnection = function() {


        if (production==='1') {
            console.log('##########################');
            console.log("USING PRODUCTION DATABASE");
            console.log("Database: " + database);
            console.log(host);
            console.log('##########################');

            return mysql.createConnection({
                host: host,
                user: user,
                database: database,
                password: password
            })
        } else {
            console.log('##########################');
            console.log('USING DEVELOPMENT DATABASE');
            console.log("Database: CleanWagon");
            console.log('##########################');

            return mysql.createConnection({
            host: 'db',
            user: 'root',
            database: 'CleanWagon',
            password: "secretPassword"
        })
        }

        
    }
    return exports
}