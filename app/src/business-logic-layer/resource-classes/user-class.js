/**
 * @class Coordinate
 */

module.exports = function ({ DbBuddy, ResponseContainer, constants }) {

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


        async insert() {
            const errors = this.validate()

            if (errors.length) {

                return new Promise(resolve =>  {
                    resolve(new ResponseContainer(
                        false, 
                        null, 
                        constants.errorCodes.VALIDATION_ERROR, 
                        errors)
                    )
                })

            } else {
                return super.insert()
            }
        }


        async update() {
            const errors = this.validate()

            if (errors.length) {

                return new Promise(resolve =>  {
                    resolve(new ResponseContainer(
                        false, 
                        null, 
                        constants.errorCodes.VALIDATION_ERROR, 
                        errors)
                    )
                })

            } else {
                return super.update()
            }
        }

        

        /**
         * Validates the members of the User class instance
         * @returns {Array<string>}
         */
        validate() {
            const errors = []

            if (this.password.length < constants.limits.MIN_PASSWORD_LENGTH) {
                errors.push(constants.errorCodes.PASSWORD_TOO_SHORT)
            } else if (!this.#isValidEmail()) {
                errors.push(constants.errorCodes.INVALID_EMAIL)
            }
            if (this.email.length < constants.limits.MIN_EMAIL_LENGTH) {
                errors.push(constants.errorCodes.EMAIL_TOO_SHORT)
            }
            if (this.first_name.length < constants.limits.MIN_FIRST_NAME_LENGTH) {
                errors.push(constants.errorCodes.FIRST_NAME_TOO_SHORT)
            }
            if (this.last_name.length < constants.limits.MIN_LAST_NAME_LENGTH) {
                errors.push(constants.errorCodes.LAST_NAME_TOO_SHORT)
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