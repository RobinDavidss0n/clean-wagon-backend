
module.exports = function ({}){

    const exports = {}

    exports.getInstance = class {
        id
        mower_id
        start_time
        end_time = null
        constructErrors = null
    
        constructor(id = null, mower_id = null, start_time = null) {
            console.log("Journey construct -> TEST")
            // switch (id) {
    
            //     //create new Journey
            //     case null:
            //         this.id = id
            //         this.mower_id = mower_id
            //         this.start_time = start_time
            //         this.createNewJourney()
            //         break;
    
            //     //Get existing Journey
            //     case !null:
                    
    
    
            //         break;
    
            //     default:
            //         break;
            // }
    
        }
    
        test(){
            console.log("test -> TEST AGAIN")
        }
        createNewJourney() {
            
        }
    
        /**
         * Validates the members of the User class instance
         * by printing them into the terminal.
         */
        validate() {
            console.log(this.id)
            console.log(this.mower_id)
            console.log(this.start_time)
            console.log(this.end_time)
        }
    
    }

    return exports

}