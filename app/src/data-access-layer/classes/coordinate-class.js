// const constants = require('../../business-logic-layer/constants')

module.exports = class Coordinate {
    x
    y
    journeyid

    constructor(x, y, journey_id) {
        this.x = x
        this.y = y
        this.journeyId = journey_id
    }

    /**
     * Validates the members of the User class instance
     * @returns {Array<string>}
     */
    validate() {
        console.log(this.location);
        console.log(this.journey_id);
        return 0;
    }
}