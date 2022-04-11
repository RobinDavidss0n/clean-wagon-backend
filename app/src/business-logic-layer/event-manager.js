const ResponseContainer = require('../data-access-layer/classes/response-container-class')

module.exports = function ({ constants }) {

    const exports = {}
    const errorCodes = constants.errorCodes

    /**
     * Validates and stores a new user to the data source.
     * @param {Coordinate} coordinate
     * @returns {Promise<ResponseContainer>}
     */
    exports.createEvent = async function (event) {

        console.log("createEvent", event);
        // const errors = coordinate.validate()

        return "Create Event"

    }

    exports.getEvent = async function (eventId) {
        console.log("getEvent", eventId);
        return {}
    }

    exports.getAllEventsByJourneyId = async function (journeyId) {
        console.log("getAllEventsByJourneyId", journeyId);
        return []
    }



    return exports

}