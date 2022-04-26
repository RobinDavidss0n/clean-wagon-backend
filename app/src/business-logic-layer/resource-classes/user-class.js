/**
 * @class Coordinate
 */

module.exports = function ({ DbBuddy }) {

    const exports = class extends DbBuddy {

        // Database attributes
        email = null
        password = null
        first_name = null
        last_name = null

        constructor(email = null, password = null, first_name = null, last_name = null) {

            super("User")
            this.email = email
            this.password = password
            this.first_name = first_name
            this.last_name = last_name
            super.createQueryInfo()
            super.updateQueryValues()
        }


        insert() {
            
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

        /**
         * Validates the user's email.
         * @returns {boolean}
         */
        #isValidEmail() {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
        }
    }

    return exports
}