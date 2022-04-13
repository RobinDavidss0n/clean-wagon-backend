const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    /*********************************************** TESTS ***********************************************/
    usersTest:          awilix.asFunction(require('./tests/users-tests')),

    /******************************************** DATA ACCESS ********************************************/
    dbConnection:       awilix.asFunction(require('./data-access-layer/db')),
    QueryManager:       awilix.asFunction(require('./data-access-layer/query-manager')),
    usersRepo:          awilix.asFunction(require('./data-access-layer/users-repo')),
    coordinateRepo:     awilix.asFunction(require('./data-access-layer/coordinate-repo')), 
    mowersRepo:         awilix.asFunction(require('./data-access-layer/mowers-repo')),
    journeyRepo:        awilix.asFunction(require('./data-access-layer/journey-repo')),
    
    /******************************************** CLASSES ********************************************/
    Journey:       awilix.asClass(require('./data-access-layer/classes/journey-class')),

    /****************************************** BUSINESS LOGIC *******************************************/
    constants:          awilix.asFunction(require('./business-logic-layer/constants')),
    usersManager:       awilix.asFunction(require('./business-logic-layer/users-manager')),
    coordinateManager:  awilix.asFunction(require('./business-logic-layer/coordinate-manager')),
    mowersManager:      awilix.asFunction(require('./business-logic-layer/mowers-manager')),

    /************************************************ API ************************************************/
    coordinateRouter:   awilix.asFunction(require('./api/routes/coordinate-router-api')),
    journeyRouter:      awilix.asFunction(require('./api/routes/journey-router-api')),
    eventRouter:        awilix.asFunction(require('./api/routes/event-router-api')),
    imageRouter:        awilix.asFunction(require('./api/routes/image-router-api')),
    apiRouter:          awilix.asFunction(require('./api/routes/router-api')),
    mowersRouter:       awilix.asFunction(require('./api/routes/mowers-router-api')),
    statusCodes:        awilix.asFunction(require('./api/statusCodeHandler')),

    /******************************************** APPLICATION ********************************************/
    app:                awilix.asFunction(require('./api/index'))
})


const app = container.resolve('app')

app.listen(3000, function () {
    console.log('Web application listening on port 3000.')
})
