const User = require('../data-access-layer/classes/user-class')

module.exports = function ({ usersManager }) {

    const exports = {}

    /**
     * Runs all tests specified in this file.
     * @returns {boolean}
     */
    exports.runAllUsersTests = async function () {
        // TODO: Include the individual testing functions here as they go.

        createUserTestSuccess = await exports.createUser()

        if (createUserTestSuccess) {
            console.log('CreateUser test passed!')
        } else {
            console.log('CreateUser test failed.')
        }
    }


    /**
     * Tests the createUser function with valid and invalid data.
     * @returns {boolean}
     */
    exports.createUser = async function () {

        emailUser = getRandomString(6)

        // Define valid and invalid user attributes:
        validEmail = emailUser + '@test.com'
        invalidEmail = 'test.test.se'
        tooShortEmail = 't@s.e'
        duplicateEmail = validEmail //should be stopped by the db

        validFirstName = 'Alice'
        tooShortFirstName = ''
        validLastName = 'Bobson'
        tooShortLastName = ''

        validPassword = 'y0u-cAn-N3veR-gUe55'
        tooShortPassword = 'only5'

        // Create new user instances:
        validUser = new User(validEmail, validPassword, validFirstName, validLastName)
        invalidUser1 = new User(invalidEmail, validPassword, tooShortFirstName, validLastName)
        invalidUser2 = new User(tooShortEmail, tooShortPassword, validFirstName, tooShortLastName)
        invalidUser3 = new User(duplicateEmail, validPassword, validFirstName, validLastName)

        // Try to add the users:
        test1 = await usersManager.createUser(validUser)
        test2 = await usersManager.createUser(invalidUser1)
        test3 = await usersManager.createUser(invalidUser2)
        test4 = await usersManager.createUser(invalidUser3)

        // Evaluate the responses:
        test1Success = (test1.isSuccess && test1.result.affectedRows == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'validationError'
            && test2.errorStack[0] == 'invalidEmail'
            && test2.errorStack[1] == 'firstNameTooShort')
        test3Success = (!test3.isSuccess && test3.errorCode == 'validationError'
            && test3.errorStack[0] == 'passwordTooShort'
            && test3.errorStack[1] == 'emailTooShort'
            && test3.errorStack[2] == 'lastNameTooShort')
        test4Success = (!test4.isSuccess && test4.errorCode == 'internalError'
            && test4.errorStack.includes('unique_email'))

        return test1Success && test2Success && test3Success && test4Success
    }


    /**
     * Tests the getUserByEmail function with valid and invalid emails.
     * @returns {boolean}
     */
    exports.getUserByEmail = async function () {

    }


    /**
     * Returns a random string of chars with the specified length
     * @param {number} length 
     * @returns {string}
     */
    function getRandomString(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyz'
        randomString = ''

        for (let i = 0; i < length; i++) {
            randomString += charset[Math.floor(Math.random() * charset.length)]
        }
        return randomString
    }

    return exports
}