// const constants = require('../../business-logic-layer/constants')
const Event = require('./event-class')

module.exports = class Coordinate {
    id
    x
    y
    journey_id
    event = null

    constructor(x, y, journey_id) {
        this.x = x
        this.y = y
        this.journeyId = journey_id
    }


    /**
     * Returns the id
     * @returns {number}
     */
    get id() {
        return this.id
    }

    /**
     * Sets the event
     * @param {Event} event
     */
    set event(event) {
        this.event = event
    }

    /**
     * Returns the event
     * @returns {Event}
     */
    get event() {
        return this.event
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