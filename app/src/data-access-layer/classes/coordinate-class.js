/**
 * @class Coordinate
 */


module.exports = function ({Event}) {

    const exports = {}

    exports.getInstance = class {
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
        
    }

    return exports
}