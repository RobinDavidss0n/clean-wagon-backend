module.exports = function ({ User, testLib }) {

    const exports = {}


    exports.runAllUsersTests = async function () {
        // TODO: Include the individual testing functions here as they go.

        createSuccess = await exports.create()
        // getSuccess = await exports.get()
        // updateSuccess = await exports.update()
        // getBySuccess = await exports.getBy()
        // getAllSuccess = await exports.getAll()

        if (!createSuccess) {
            console.log('CreateUser test failed.')
        }

        // if (!getSuccess) {
        //     console.log('GetUser test failed.')
        // }

        // if (!updateSuccess) {
        //     console.log('UpdateUser test failed.')
        // }

        // if (!getBySuccess) {
        //     console.log('getByUser test failed.')
        // }

        // if (!getAllSuccess) {
        //     console.log('getAllUser test failed.')
        // }

        // if(createSuccess && getSuccess && updateSuccess && getBySuccess && getAllSuccess) {
        //     console.log('\n\nUser tests passed!\n\n')
        // }
    }


    exports.create = async function () {

        emailUser = testLib.getRandomString(6)

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
        const validUser = new User(validEmail, validPassword, validFirstName, validLastName)
        const invalidUser1 = new User(invalidEmail, validPassword, tooShortFirstName, validLastName)
        const invalidUser2 = new User(tooShortEmail, tooShortPassword, validFirstName, tooShortLastName)
        const invalidUser3 = new User(duplicateEmail, validPassword, validFirstName, validLastName)

        // Try to add the users:
        test1 = await validUser.insert()
        test2 = await invalidUser1.insert()
        test3 = await invalidUser2.insert()
        test4 = await invalidUser3.insert()

        // Evaluate the responses:
        test1Success = (test1.isSuccess && test1.result.affectedRows == 1)
        console.log(test1)
        console.log(test1Success)

        test2Success = (!test2.isSuccess && test2.errorCode == 'validationError'
            && test2.errorStack[0] == 'invalidEmail'
            && test2.errorStack[1] == 'firstNameTooShort')
        console.log(test2)
        console.log(test2Success)


        test3Success = (!test3.isSuccess && test3.errorCode == 'validationError'
            && test3.errorStack[0] == 'passwordTooShort'
            && test3.errorStack[1] == 'emailTooShort'
            && test3.errorStack[2] == 'lastNameTooShort')
        console.log(test3)
        console.log(test3Success)


        test4Success = (!test4.isSuccess && test4.errorCode == 'internalError'
            && test4.errorStack.includes('unique_email'))
        console.log(test4)
        console.log(test4Success)


        return test1Success && test2Success && test3Success && test4Success
    }


    /**
     * Tests the getUserByEmail function with valid and invalid emails.
     * @returns {boolean}
     */
    exports.getUserByEmail = async function () {

    }

    // TODO: Delete function definition below when verified that 'testLib' import is working properly!
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