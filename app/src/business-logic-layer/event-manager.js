const ResponseContainer = require('../data-access-layer/classes/response-container-class')

module.exports = function ({ constants, eventRepo }) {

    const exports = {}
    const errorCodes = constants.errorCodes

    /**
     * Validates and stores a new user to the data source.
     * @param {Coordinate} coordinate
     * @returns {Promise<ResponseContainer>}
     */
    exports.createEvent = async function (event) {

        return await eventRepo.createEvent(event)
    }

    exports.getEvent = async function (eventId) {
        return await eventRepo.getEvent(eventId)
    }

    return exports

}