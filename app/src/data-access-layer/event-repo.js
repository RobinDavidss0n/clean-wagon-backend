module.exports = function ({ QueryManager }) {

    const exports = {}
    const resourceName = 'event'

    /**
     * Inserts a new event into the database.
     * @param {object} event
     * @returns {Promise<ResponseContainer>}
     */
    exports.createEvent = async function (event) {
        const query = `
        INSERT INTO Events (coordinate_id, event_type, filename, object_desc)
        VALUES (?, ?, ?, ?)
        `
        const values = [
            event.coordinate_id,
            event.event_type,
            event.filename,
            event.object_desc
        ]
        return await QueryManager.runQuery(query, values, resourceName)
    }

    exports.getEvent = async function (event_id) {
        const query = `
        SELECT * 
        FROM Events 
        WHERE id = ?;
        `
        const values = [
            event_id
        ]
        return await QueryManager.runQuery(query, values, resourceName)
    }

    return exports

}