
module.exports = function ({ DbBuddy }) {

    const exports = class extends DbBuddy{

        // Database attributes

        mower_id = null
        start_time = null
        end_time = null

        constructor(mower_id = null, start_time = null) {
  
            super("Journey")
            this.mower_id = mower_id
            this.start_time = start_time
            super.createQueryInfo()
            super.updateQueryValues()

        }

    }

    return exports

}