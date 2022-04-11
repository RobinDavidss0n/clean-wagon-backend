module.exports = function({QueryManager}) {

    const exports = {}
    const resourceName = 'mowers'

    /**
     * Gets all mowers with the specified user id.
     * @param {number} user_id
     * @returns {Promise<ResponseContainer>}
     */
    exports.getMowersByUserId = async function(user_id) {
        const query = `
        SELECT * 
        FROM Mowers
        WHERE user_id = ?
        `
        const values = [user_id]

        return await QueryManager.runQuery(query, values, resourceName)
    }


    /**
     * Returns the mower with the supplied serial number.
     * @param {string} mower_serial 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getMowerBySerial = async function(mower_serial) {
        const query = `
        SELECT *
        FROM Mowers
        WHERE mower_serial = ?`

        const values = [mower_serial]

        return await QueryManager.runQuery(query, values, resourceName)
    }


    return exports
}