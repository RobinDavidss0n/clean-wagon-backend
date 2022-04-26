/**
 * @class Event
 */

module.exports = function ({ DbBuddy }) {

    const exports = class extends DbBuddy {

        // Database attributes
        coordinate_id = null
        event_type = null
        filename = null
        object_desc = null

        constructor(coordinate_id = null) {

            super("Event")
            this.coordinate_id = coordinate_id
            super.createQueryInfo()
            super.updateQueryValues()
        }

        async insert() {
            const errors = this.#validate()

            if (errors.length) {

                return new Promise(resolve => {
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
            const errors = this.#validate()

            if (errors.length) {

                return new Promise(resolve => {
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
         * Validates the members of the Events class instance
         * @returns {Array<string>}
         */
        #validate() {

            let errors = []

            if (this.image_id === undefined || this.image_id === '') {
                errors.push('No image in request.')
            }

            if (this.coordinate_id === undefined || this.coordinate_id === '') {
                errors.push('No coordinate_id in request.')
            }

            if (this.event_type === undefined || this.event_type === '') {
                errors.push('No event_type in request.')
            }

            return errors;
        }

    }

    return exports
}