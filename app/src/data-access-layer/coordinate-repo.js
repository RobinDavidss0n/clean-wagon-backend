module.exports = function ({ QueryManager }) {

    const exports = {}
    const resourceName = 'coordinate'

    /**
     * Inserts a new coordinate into the database.
     * @param {object} coordinate
     * @returns {Promise<ResponseContainer>}
     */
    exports.createCoordinate = async function (coordinate) {
        const query = `
        INSERT INTO Coordinates (x, y, journey_id)
        VALUES (?, ?, ?)
        `
        const values = [
            coordinate.x,
            coordinate.y,
            coordinate.journey_id,
        ]
        return await QueryManager.runQuery(query, values, resourceName)
    }


    /**
     * Returns all coordinates with the given journey id.
     * @param {string} journeyId 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getCoordinatesByJourneyId = async function(journeyId) {
        const query = `
            SELECT *
            FROM Coordinates
            WHERE journey_id = ?
        `
        const values = [journeyId]

        return await QueryManager.runQuery(query, values, resourceName)
    }

    return exports

}