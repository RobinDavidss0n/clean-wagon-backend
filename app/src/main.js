const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    /*********************************************** TESTS ***********************************************/
    usersTest:          awilix.asFunction(require('./tests/users-tests')),

    /******************************************** DATA ACCESS ********************************************/
    dbConnection:       awilix.asFunction(require('./data-access-layer/db')),
    QueryManager:       awilix.asFunction(require('./data-access-layer/query-manager')),
    usersRepo:          awilix.asFunction(require('./data-access-layer/users-repo')),
    mowersRepo:         awilix.asFunction(require('./data-access-layer/mowers-repo')),

    /****************************************** BUSINESS LOGIC *******************************************/
    constants:          awilix.asFunction(require('./business-logic-layer/constants')),
    usersManager:       awilix.asFunction(require('./business-logic-layer/users-manager')),
    mowersManager:      awilix.asFunction(require('./business-logic-layer/mowers-manager')),

    /************************************************ API ************************************************/
    mowersRouter:       awilix.asFunction(require('./api/routes/mowers-router-api')),
    apiRouter:          awilix.asFunction(require('./api/routes/router-api')),
    imageRouter:        awilix.asFunction(require('./api/routes/image-router-api')),
    statusCodes:        awilix.asFunction(require('./api/statusCodeHandler')),

    /******************************************** APPLICATION ********************************************/
    app:                awilix.asFunction(require('./api/index'))
})


const app = container.resolve('app')

app.listen(3000, function () {
    console.log('Web application listening on port 3000.')
})
