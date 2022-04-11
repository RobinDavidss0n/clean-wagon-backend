module.exports = function ({ QueryManager }) {

    const exports = {}
    const resourceName = 'journeys'

    /**
     * Inserts a new journey into the database.
     * @param {object} journey
     * @returns {Promise<ResponseContainer>}
     */
    exports.createJourney = async function (journey) {
        const query = `
        INSERT INTO Journeys (mower_id, start_time, end_time)
        VALUES (?, ?, ?)
        `
        const values = [
            journey.mower_id,
            journey.start_time,
            journey.end_time
        ]
        return await QueryManager.runQuery(query, values, resourceName)
    }

    /**
     * Update a journey in the database.
     * @param {object} journey
     * @returns {Promise<ResponseContainer>}
     */
         exports.updateJourney = async function (journey) {
            const query = `
            UPDATE Journeys (mower_id, start_time, end_time)
            SET (?, ?, ?)
            `
            const values = [
                journey.mower_id,
                journey.start_time,
                journey.end_time
            ]
            return await QueryManager.runQuery(query, values, resourceName)
        }

    return exports

}