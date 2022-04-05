module.exports = function({usersRepo, User, ResponseContainer, Constants}) {

    const exports = {}
    const errorCodes = Constants.errorCodes

    /**
     * Validates and stores a new user to the data source.
     * @param {User} user
     * @returns {Promise<ResponseContainer>}
     */
    exports.createUser = async function(user) {
        const errors = user.validate()

        if (errors.length) {
            return new ResponseContainer(
                false,
                null,
                errorCodes.VALIDATION_ERROR,
                errors
            )
        } else {
            return await usersRepo.createUser(user)
        }

    }


    /**
     * Gets the user with the specified email from the data source.
     * @param {string} email 
     * @returns {Promise<ResponseContainer>}
     */
    exports.getUserByEmail = async function(email) {
        return await usersRepo.getUserByEmail(email)
    }


    return exports

}