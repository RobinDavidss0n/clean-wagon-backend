/**
 * @class Coordinate
 */

 module.exports = function({DbBuddy}) {

    const exports = class extends DbBuddy {

        // Database attributes
        journey_id = null
        x = null
        y = null
        is_event = null
        time = null

        constructor(journey_id = null, x = null, y = null, is_event = false) {

            super("Coordinate")
            this.journey_id = journey_id
            this.x = x
            this.y = y
            this.is_event = is_event
            this.time = new Date()
            super.createQueryInfo()
            super.updateQueryValues()
        }
    }

    return exports
}