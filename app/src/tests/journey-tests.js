module.exports = function({ Journey }) {
    const exports = {}

    exports.test = async function(){

        const journey = new Journey(null, 1, null)
        const resultQuery = await journey.create()

        // console.log("journeyTests -> journey resultQuery:")
        // console.log(resultQuery)

        console.log("journeyTests -> journey id: " + journey.id)
    }

    
    return exports
}