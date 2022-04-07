const Coordinate = require('../data-access-layer/classes/coordinate-class')
const ResponseContainer = require('../data-access-layer/classes/response-container-class')

module.exports = function ({ coordinateRepo, constants }) {

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

    return exports

}