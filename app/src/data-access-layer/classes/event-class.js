/**
 * @class Event
 */

module.exports = function({}) {

    const exports = {}

    exports.getInstance() = class {
    
        coordinate_id
        event_type
        filename
        object_desc
    
        constructor(coordinate_id, event_type, filename, object_desc) {
            this.coordinate_id = coordinate_id
            this.event_type = event_type
            this.filename = filename
            this.object_desc = object_desc
        }
    
        /**
         * Validates the members of the User class instance
         * @returns {Array<string>}
         */
        validate() {
            return;
        }

    }
    
    return exports
}