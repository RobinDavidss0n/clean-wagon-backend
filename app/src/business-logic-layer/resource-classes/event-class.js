/**
 * @class Event
 */

 module.exports = function({DbBuddy}) {

    const exports = class extends DbBuddy {

        // Database attributes
        coordinate_id = null
        event_type = null
        filename = null
        object_desc = null

        constructor(coordinate_id = null) {

            super("Event")
            this.coordinate_id = coordinate_id
            super.createQueryInfo()
            super.updateQueryValues()
        }
    }

    return exports
}