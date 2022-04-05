const mysql = require('mysql2')

module.exports = function() {

    const exports = {}

    /**
     * Creates and returns a connection to the (MySQL) database.
     * @returns {object}
     */
    exports.getConnection = function() {

        return mysql.createConnection({
            host: 'db',
            user: 'root',
            database: 'CleanWagon',
            password: "secretPassword"
        })
    }
    return exports
}