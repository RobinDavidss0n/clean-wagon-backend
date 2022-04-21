module.exports = function({ Journey }) {
    const exports = {}

    exports.test = async function(){


        var journey = new Journey(1)
        var resultQuery = await journey.insert()

        console.log('\n')
        console.log("\njourneyTests -> journey resultQuery:")
        console.log(resultQuery)

        //**************** journey.get() ****************

        var journey = new Journey()
        var resultQuery = await journey.get(1)

        console.log("\njourneyTests -> journey resultQuery:")
        console.log(resultQuery)
        
        journey.visualValidation()


        // **************** journey.update() ****************
        
        var journey = new Journey()
        await journey.get(1)
        journey.visualValidation()

        journey.end_time = new Date()
        journey.start_time = new Date()
        journey.visualValidation()

        var resultQuery = await journey.update()
        console.log("\njourneyTests -> journey resultQuery:")
        console.log(resultQuery)


        // **************** journey.getBy() ****************

        var journey = new Journey()
        var resultQuery = await journey.getBy("mower_id", 1)

        console.log("\njourneyTests -> journey resultQuery:")
        console.log(resultQuery)

        // **************** journey.getAllFrom() ****************

        var journey = new Journey()
        await journey.get(1)

        resultQuery = await journey.getAll("Coordinates")

        console.log("\njourneyTests -> journey resultQuery:")
        console.log(resultQuery)


    }

    return exports
}