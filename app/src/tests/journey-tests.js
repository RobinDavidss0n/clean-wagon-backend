module.exports = function({ Journey }) {
    const exports = {}

    exports.test = async function(){

        const journey = new Journey(null, 1, null)
        const resultQuery = await journey.create()

        // console.log("journeyTests -> journey resultQuery:")
        // console.log(resultQuery)

        console.log("journeyTests -> journey id: " + journey.id)

        

        //**************** journey.get() IN PROGRESS ****************

        // const journey2 = new Journey(1)
        // const resultQuery2 = await journey.get()

        // console.log("journeyTests -> journey2 resultQuery2:")
        // console.log(resultQuery2)

        // console.log("journeyTests -> journey2 id: " + journey2.id)
    }

    return exports
}