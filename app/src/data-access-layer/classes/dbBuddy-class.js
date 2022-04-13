
module.exports = function ({ QueryManager }) {

    const exports = class {

        #m_class
        #className
        #memberNames = ""
        #memberQuestionmarks = ""
        #memberValues = []

        constructor(givenClass) {

            if (givenClass != null) {
                this.#m_class = givenClass
                this.#className = this.#m_class.getClassName()

                for (const memberName in this.#m_class) {

                    this.#memberNames += memberName + ","

                    this.#memberQuestionmarks += "?,"

                    this.#memberValues.push(this.#m_class[memberName])
                }
                this.#memberNames = this.#memberNames.slice(0, -1)
                this.#memberQuestionmarks = this.#memberQuestionmarks.slice(0, -1)
            }
        }


        /**
         * Get a resource from the database
         * with the current class instance's id.
         * @returns {Promise<ResponseContainer>}
         */
        async get() {

            const query = `
            SELECT *
            FROM ${this.#className}s
            WHERE id = ?
            LIMIT 1
            `

            return await QueryManager.runQuery(query, this.#memberValues, this.#className)
        }

        /**
         * Get a resource from the database
         * with a given attribute name and -value.
         * @returns {Promise<ResponseContainer>}
         * @param {string} attribute 
         * @param {undefined} value 
         */
        async getBy(attributeName, value) {

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
            const query = `
            INSERT INTO ${this.#className}s (${this.#memberNames})
            VALUES (${this.#memberQuestionmarks})
            `
            return await QueryManager.runQuery(query, this.#memberValues, this.#className)
  
        }

        /**
         * Update a resource in the database
         * from the current class instance values.
         * @returns {Promise<ResponseContainer>}
         */
        async update() {
            const query = `
            UPDATE ${this.#className}s (${this.#memberNames})
            SET (${this.#memberQuestionmarks})
            `
            return await QueryManager.runQuery(query, this.#memberValues, this.#className)
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
            const query = `
            SELECT *
            FROM ${table}
            WHERE ${this.#className.toLowerCase()}_id = ?
            `
            return await QueryManager.runQuery(query, [this.#m_class.id], table.slice(0, -1))
        }

    }

    return exports

}