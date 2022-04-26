

module.exports = function ({ coordinateRepo, constants, Coordinate, ResponseContainer }) {

    const exports = {}
    const errorCodes = constants.errorCodes

    /**
     * Validates and stores a new user to the data source.
     * @param {Coordinate} coordinate
     * @returns {Promise<ResponseContainer>}
     */
    exports.createCoordinate = async function (coordinate) {

        // const errors = coordinate.validate()

        return await coordinateRepo.createCoordinate(coordinate)

    }


    /**
     * Returns all coordinates that belong to the given journey id.
     * @param {string} journeyId 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getCoordinatesByJourneyId = async function(journeyId) {

        return await coordinateRepo.getCoordinatesByJourneyId(journeyId)
    }

    return exports

}