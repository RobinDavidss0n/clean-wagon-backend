/**
 * @class Mower
 */

module.exports = function({}) {

    const exports = {};
    
    exports.getInstance = class {
        id
        mower_serial
        user_id
        is_online
    
        constructor(id='none', mower_serial, user_id, is_online=false) {
            this.mower_serial = mower_serial
            this.user_id = user_id
            this.is_online = is_online
            if (id != 'none') {
                this.id = id
            }        
        }


        /**
         * Sets the mower's online status
         * @param {boolean} isOnline
         */
        set is_online(isOnline) {
            this.is_online = isOnline
        }


        /**
         * Gets the mower's online status
         * @returns {boolean}
         */
        get is_online() {
            return this.is_online
        }
    }
    
    return exports
}

    