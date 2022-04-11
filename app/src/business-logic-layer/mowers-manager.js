const Mower = require('../data-access-layer/classes/mower-class')
const ResponseContainer = require('../data-access-layer/classes/response-container-class')

module.exports = function({mowersRepo, constants}) {

    const exports = {}
    const errorCodes = constants.errorCodes

    /**
     * Returns all mowers connected to the supplied user id.
     * @param {string} user_id 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getMowersByUserId = async function(user_id) {
        return await mowersRepo.getMowerByUserId(user_id)
    }


    /**
     * Returns the mower with the supplied serial number.
     * @param {string} mower_serial 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getMowerBySerial = async function(mower_serial) {
        return await mowersRepo.getMowerBySerial(mower_serial)
    }
}