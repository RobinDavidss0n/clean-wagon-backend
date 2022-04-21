module.exports = function() {
    
    const exports = {}

    exports.errorCodes = {
        VALIDATION_ERROR: 'validationError',
        EMAIL_TOO_SHORT: 'emailTooShort',
        INVALID_EMAIL: 'invalidEmail',
        PASSWORD_TOO_SHORT: 'passwordTooShort',
        FIRST_NAME_TOO_SHORT: 'firstNameTooShort',
        LAST_NAME_TOO_SHORT: 'lastNameTooShort'
    }

    exports.limits = {
        MIN_EMAIL_LENGTH: 6,
        MIN_FIRST_NAME_LENGTH: 1,
        MIN_LAST_NAME_LENGTH: 1,
        MIN_PASSWORD_LENGTH: 8
    }

    exports.constructorAction = Object.freeze({
        NEW: 0,
        GET: 1
    })

    return exports
}