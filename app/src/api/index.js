// Toggle test runs:
const willRunTests = false
const express = require('express')
const bodyParser = require('body-parser')

module.exports = function ({ usersTest, statusCodes, apiRouter,
    imageRouter, coordinateRouter, eventRouter, journeyRouter,
    mowersRouter, journeyTest, mowerTest, eventTest, coordinateTest,
    testing }) {
    console.log(statusCodes.NotExtended)

    const app = express()

    app.use(bodyParser.json());

    app.use(function (request, response, next) {
        console.log(request.method, request.url);

        response.setHeader("Access-Control-Allow-Origin", "*") // "localhost:3000"
        response.setHeader("Access-Control-Allow-Methods", "*") // GET, POST, PUT, DELETE
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")

        next()
    })

    /****************************** Say hello to visitors *******************************/
    app.get('/', function (req, res) {
        res.status(statusCodes.OK).json({ "Hello": "World" }).end();
    })


    /********************************* Set up router(s) *********************************/
    app.use('/api/v1/images', imageRouter)
    app.use('/api/v1/coordinates', coordinateRouter)
    app.use('/api/v1/events', eventRouter)
    app.use('/api/v1/journeys', journeyRouter)
    app.use('/api/v1/mowers', mowersRouter)


    /************************************ Run tests *************************************/
    testing.testing()

    if (willRunTests) {
        console.log('Running tests...\n')
        usersTest.runAllUsersTests()
        journeyTest.runAllJourneyTests()
        mowerTest.runAllMowerTests()
        eventTest.runAllEventTests()
        coordinateTest.runAllCoordinateTests()
    }


    /************************************************************************************/

    return app
}
