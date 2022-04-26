module.exports = function ({ User, testLib, constants }) {

    const exports = {}


    exports.runAllUsersTests = async function () {

        createSuccess = await exports.create()
        getSuccess = await exports.get()
        updateSuccess = await exports.update()
        getBySuccess = await exports.getBy()
        getAllSuccess = await exports.getAll()

        if (!createSuccess) {
            console.log('CreateUser test failed.')
        }

        if (!getSuccess) {
            console.log('GetUser test failed.')
        }

        if (!updateSuccess) {
            console.log('UpdateUser test failed.')
        }

        if (!getBySuccess) {
            console.log('getByUser test failed.')
        }

        if (!getAllSuccess) {
            console.log('getAllUser test failed.')
        }

        if(createSuccess && getSuccess && updateSuccess && getBySuccess && getAllSuccess) {
            console.log('\n\nUser tests passed!\n\n')
        }
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

    exports.get = async function() {

        const successUser = new User()
        const failUser = new User()
        
        const test1 = await successUser.get(1)
        const test2 = await failUser.get(999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'UserNotFound')

        return test1Success && test2Success
    }


    exports.update = async function() {

        const user = new User()
        await user.get(1)

        const newPassword = 'hemligtloesenord'
        const newFirstName = 'Hasse'

        user.password = newPassword
        user.first_name = newFirstName

        const test1 = await user.update()

        const user2 = new User()
        const test2 = await user2.get(1)

        user.email = 'fail' // not a proper email
        const test3 = await user.update()

        test1Success = (test1.isSuccess && test2.result[0].password == newPassword && user2.first_name == newFirstName)
        test2Success = (!test3.isSuccess && test3.errorCode == 'validationError' && test3.errorStack[0] == constants.errorCodes.INVALID_EMAIL) 

        return test1Success && test2Success
    }


    exports.getBy = async function() {

        const successUser = new User()
        const failUser = new User()
        
        const test1 = await successUser.getBy("email", 'testUser@cln-wgn.com')
        const test2 = await failUser.getBy("email", 999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'UserNotFound')

        return test1Success && test2Success
    }


    exports.getAll = async function() {

        const user = new User()
        await user.get(1)
        
        const test1 = await user.getAll('Mowers')
        const test2 = await user.getAll('Coordinates')

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('Unknown column'))

        return test1Success && test2Success
    }


    return exports
}