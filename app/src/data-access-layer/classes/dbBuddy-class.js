
module.exports = function ({ QueryManager }) {

    const exports = class {

        #id

        #className
        #memberNames = ""
        #memberQuestionmarks = ""
        #memberValues = []

        constructor(className) {
            this.#className = className
        }

        getId() {
            return this.#id
        }

        /**
         * Creates the query info that is used when
         * interacting with the database.
         */
        createQueryInfo() {

            for (const memberName in this) {

                this.#memberNames += memberName + ","

                this.#memberQuestionmarks += "?,"
            }
            this.#memberNames = this.#memberNames.slice(0, -1)
            this.#memberQuestionmarks = this.#memberQuestionmarks.slice(0, -1)
        }

        /**
         * Takes the members that the child class has
         * and put them into memberValues
         * to be used when interacting with the database.
         * This Should allways be done before interacting
         * with the database to ensue all the members values are
         * updated before they are used with the database.
         */
        updateQueryValues() {
            console.log("updateQueryValues")
            this.#memberValues = []
            for (const memberName in this) {
                this.#memberValues.push(this[memberName])
            }
        }

        /**
         * Updates the local memebrs in the class instance.
         * This should be called after getting new data from
         * the database.
         * @param {object} result 
         */
        #updateClassMembers(result) {
            console.log("DbBuddy -> updateClassMembers -> result:")
            console.log(result)
            for (const key in result) {
                this[key] = result[key]
            }
        }


        /**
         * Get a resource from the database
         * with the current class instance's id.
         * @returns {Promise<ResponseContainer>}
         */
        async get() {

            this.updateQueryValues()

            const query = `
            SELECT *
            FROM ${this.#className}s
            WHERE id = ?
            LIMIT 1
            `
            const responseContainer = await QueryManager.runQuery(query, this.#memberValues, this.#className)

            if (responseContainer.isSuccess) {
                this.#updateClassMembers(responseContainer.result)
            }

            return responseContainer
        }

        /**
         * Get a resource from the database
         * with a given attribute name and -value.
         * @returns {Promise<ResponseContainer>}
         * @param {string} attribute 
         * @param {undefined} value 
         */
        async getBy(attributeName, value) {

            this.updateQueryValues()

            const query = `
                    SELECT *
                    FROM ${this.#className}s
                    WHERE ${attributeName} = ?
                    LIMIT 1
                    `

            return await QueryManager.runQuery(query, [value], this.#className)
        }

        /**
         * Insert a new resource into the database
         * from the current class instance values.
         * @returns {Promise<ResponseContainer>}
         */
        async insert() {

            this.updateQueryValues()

            this.visualValidation()
            const query = `
            INSERT INTO ${this.#className}s (${this.#memberNames})
            VALUES (${this.#memberQuestionmarks})
            `
            console.log(" ")
            console.log("Query: ")
            console.log(query)

            console.log(" ")
            console.log("Values: ")
            console.log(this.#memberValues)
            return await QueryManager.runQuery(query, this.#memberValues, this.#className)

        }

        /**
         * Update a resource in the database
         * from the current class instance values.
         * @returns {Promise<ResponseContainer>}
         */
        async update() {

            this.updateQueryValues()

            const query = `
            UPDATE ${this.#className}s (${this.#memberNames})
            SET (${this.#memberQuestionmarks})
            WHERE id = ?
            `

            const responseContainer = await QueryManager.runQuery(query, this.#memberValues, this.#className)

            if (responseContainer.isSuccess) {
                u
            }
        }

        async delete() {
            // TODO:
        }

        /**
         * Get all entries from a given table
         * where the foreign key to the current resource
         * is equal to the class instance's id.
         * @param {string} table 
         * @returns {Promise<ResponseContainer>}
         */
        async getAllFrom(table) {

            this.updateQueryValues()

            const query = `
            SELECT *
            FROM ${table}
            WHERE ${this.#className.toLowerCase()}_id = ?
            `
            return await QueryManager.runQuery(query, [this.id], table.slice(0, -1))
        }

        /**
         * Validates the members of the User class instance
         * by printing them into the terminal.
         */
        visualValidation() {
            for (const memberName in this) {
                console.log(`${this.#className} class -> ${memberName}: ` + this[memberName])
            }

        }

    }

    return exports

}