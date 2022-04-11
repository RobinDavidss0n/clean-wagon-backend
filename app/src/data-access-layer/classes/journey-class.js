// const constants = require('../../business-logic-layer/constants')

module.exports = class Coordinate {
    id
    mower_id
    start_time
    end_time = null

    constructor(id, mower_id, start_time) {
        this.id = id
        this.mower_id = mower_id
        this.start_time = start_time
    }

    /**
     * Validates the members of the User class instance
     * by printing them into the terminal.
     */
    validate() {
        console.log(this.id)
        console.log(this.mower_id)
        console.log(this.start_time)
        console.log(this.end_time)
    }
}