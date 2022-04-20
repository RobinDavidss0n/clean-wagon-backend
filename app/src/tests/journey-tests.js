module.exports = function({ Journey }) {
    const exports = {}

    exports.test = async function(){

        const journey = new Journey(1, 1, null)
        journey.visualValidation()
        const resultQuery = await journey.insert()

        console.log("journeyTests -> journey resultQuery:")
        console.log(resultQuery)


        

        //**************** journey.get() IN PROGRESS ****************

        // const journey2 = new Journey(1)
        // const resultQuery2 = await journey2.get()

        // console.log("journeyTests -> journey2 resultQuery2:")
        // console.log(resultQuery2)
        
        // journey2.visualValidation()

    }

    return exports
}