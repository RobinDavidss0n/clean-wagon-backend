
module.exports = function ({ DbBuddy }) {

    const exports = class {
        #className = "Journey"

        // Database attributes
        id
        mower_id
        start_time
        end_time = null

        #responseContainer

        constructor(id = null, mower_id = null, start_time = null) {

            this.id = id
            this.mower_id = mower_id
            this.start_time = start_time


        }


        //*****************************************************/
        // TODO: SQL ERROR
        async create() {

            const dbb = new DbBuddy(this)
            this.#responseContainer = await dbb.insert()

            if (this.#responseContainer.isSuccess) {
                this.id = this.#responseContainer.result.insertId
            }

            return this.#responseContainer
        }


        get() {
            const dbb = new DbBuddy(this)
            this.#responseContainer = dbb.get()
            if (this.#responseContainer.isSuccess) {
                this.#updateClassMembers(this.#responseContainer.results[0])
            }
        }

        #updateClassMembers(array) {
            for (const [attribute, i] in array) {

            }
        }


        getClassName() {
            return this.#className
        }

        getResponeContainer() {
            return this.#responseContainer
        }

        /**
         * Validates the members of the User class instance
         * by printing them into the terminal.
         */
        visualValidation() {
            console.log("Journey class -> id: " + this.id)
            console.log("Journey class -> mower_id: " + this.mower_id)
            console.log("Journey class -> start_time: " + this.start_time)
            console.log("Journey class -> end_time: " + this.end_time)
        }

    }

    return exports

}