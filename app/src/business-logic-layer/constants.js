module.exports = function() {
    
    const exports = {}

    exports.errorCodes = {
        VALIDATION_ERROR: 'validationError'
    }

    exports.limits = {
        MIN_EMAIL_LENGTH: 5,
        MIN_FIRST_NAME_LENGTH: 1,
        MIN_LAST_NAME_LENGTH: 1,
        MIN_PASSWORD_LENGTH: 8
    }

    return exports
}