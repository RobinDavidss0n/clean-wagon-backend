const constants = require('../../business-logic-layer/constants')

module.exports = class User {
    email
    password
    first_name
    last_name
    limits 
    errorCodes

    constructor(email, password, first_name, last_name) {
        this.email = email
        this.password = password
        this.first_name = first_name
        this.last_name = last_name
        this.limits = constants().limits
        this.errorCodes = constants().errorCodes
    }

    /**
     * Validates the members of the User class instance
     * @returns {Array<string>}
     */
    validate() {
        const errors = []

        if (this.password.length < this.limits.MIN_PASSWORD_LENGTH) {
            errors.push(this.errorCodes.PASSWORD_TOO_SHORT)
        } else if (!this.#isValidEmail()) {
            errors.push(this.errorCodes.INVALID_EMAIL)
        }
        if (this.email.length < this.limits.MIN_EMAIL_LENGTH) {
            errors.push(this.errorCodes.EMAIL_TOO_SHORT)
        }
        if (this.first_name.length < this.limits.MIN_FIRST_NAME_LENGTH) {
            errors.push(this.errorCodes.FIRST_NAME_TOO_SHORT)
        }
        if (this.last_name.length < this.limits.MIN_LAST_NAME_LENGTH) {
            errors.push(this.errorCodes.LAST_NAME_TOO_SHORT)
        }

        return errors
    }


    #isValidEmail() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    }

}