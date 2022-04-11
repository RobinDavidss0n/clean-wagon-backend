module.exports = class Mower {
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
}