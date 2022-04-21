/**
 * @class Mower
 */

module.exports = function({DbBuddy}) {

    const exports = class extends DbBuddy {

        // Database attributes
        id = null
        mower_serial = null
        user_id = null
        is_online = null

        constructor(user_id = null, mower_serial = null, is_online = null) {

            super("Mower")
            this.user_id = user_id
            this.mower_serial = mower_serial
            this.is_online = is_online
            super.createQueryInfo()
            super.updateQueryValues()
        }
    }

    return exports
}