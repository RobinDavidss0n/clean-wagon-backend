module.exports = function({QueryManager}) {

    const exports = {}
    const resourceName = 'users'

    /**
     * Inserts a new user into the database.
     * @param {object} user
     * @returns {Promise<ResponseContainer>}
     */
    exports.createUser = async function(user) {
        const query = `
        INSERT INTO Users (email, password, first_name, last_name)
        VALUES (?, ?, ?, ?)
        `
        const values = [
            user.email,
            user.password,
            user.first_name, 
            user.last_name
        ]
        return await QueryManager.runQuery(query, values, resourceName)
    }


    /**
     * Gets the user with the specified email from the database.
     * @param {string} email 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getUserByEmail = async function(email) {
        const query = `
        SELECT *
        FROM users
        WHERE email = ?
        `
        const values = [email]

        return await QueryManager.runQuery(query, values, resourceName)
    }


    return exports


}