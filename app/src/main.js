const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    /*** TESTS ********************************************************************************************/
    usersTest:          awilix.asFunction(require('./tests/users-tests')),
    journeyTest:        awilix.asFunction(require('./tests/journey-tests')),
    mowerTest:          awilix.asFunction(require('./tests/mower-tests')),
    coordinateTest:     awilix.asFunction(require('./tests/coordinate-tests')),
    eventTest:          awilix.asFunction(require('./tests/event-tests')),

    testing:            awilix.asFunction(require('./tests/testing')),
    
    testLib:            awilix.asFunction(require('./tests/lib')),

    /*** DATA ACCESS **************************************************************************************/
    dbConnection:       awilix.asFunction(require('./data-access-layer/db')),
    QueryManager:       awilix.asFunction(require('./data-access-layer/query-manager')),
    
    DbBuddy:            awilix.asClass(require('./data-access-layer/classes/dbBuddy-class')),
    ResponseContainer:  awilix.asClass(require('./data-access-layer/classes/response-container-class')),

    /*** BUSINESS LOGIC ***********************************************************************************/
    constants:          awilix.asFunction(require('./business-logic-layer/constants')),
    
    /*** SERVICESE ***********************************************************************************/
    s3Bucket:           awilix.asFunction(require('./business-logic-layer/services/s3-bucket')),
    googleVision:       awilix.asFunction(require('./business-logic-layer/services/google-vision')),

    /*** RESOURCE CLASSES ******************************************************************************************/
    Mower:              awilix.asClass(require('./business-logic-layer/resource-classes/mower-class')),
    Event:              awilix.asClass(require('./business-logic-layer/resource-classes/event-class')),
    Coordinate:         awilix.asClass(require('./business-logic-layer/resource-classes/coordinate-class')),
    User:               awilix.asClass(require('./business-logic-layer/resource-classes/user-class')),
    Journey:            awilix.asClass(require('./business-logic-layer/resource-classes/journey-class')),

    /*** API **********************************************************************************************/
    apiRouter:          awilix.asFunction(require('./api/routes/router-api')),
    coordinateRouter:   awilix.asFunction(require('./api/routes/coordinate-router-api')),
    journeyRouter:      awilix.asFunction(require('./api/routes/journey-router-api')),
    eventRouter:        awilix.asFunction(require('./api/routes/event-router-api')),
    imageRouter:        awilix.asFunction(require('./api/routes/image-router-api')),
    mowersRouter:       awilix.asFunction(require('./api/routes/mowers-router-api')),

    statusCodes:        awilix.asFunction(require('./api/statusCodeHandler')),

    /*** APPLICATION **************************************************************************************/
    app:                awilix.asFunction(require('./api/index'))
})


const app = container.resolve('app')

app.listen(3000, function () {
    console.log('Web application listening on port 3000.')
})
