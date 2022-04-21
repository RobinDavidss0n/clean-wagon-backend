
module.exports = function ({ DbBuddy }) {

    const exports = class extends DbBuddy{

        // Database attributes

        mower_id = null
        start_time = null
        end_time = null

        constructor(mower_id = null,) {
  
            super("Journey")
            this.mower_id = mower_id
            this.start_time = new Date()
            super.createQueryInfo()
            super.updateQueryValues()

        }

    }

    return exports

}