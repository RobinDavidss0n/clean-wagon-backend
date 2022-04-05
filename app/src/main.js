const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    /*********************************************** TESTS ***********************************************/
    usersTest:          awilix.asFunction(require('./tests/users-tests')),

    /******************************************** DATA ACCESS ********************************************/
    dbConnection:       awilix.asFunction(require('./data-access-layer/db')),
    QueryManager:       awilix.asFunction(require('./data-access-layer/query-manager')),
    usersRepo:          awilix.asFunction(require('./data-access-layer/users-repo')),

    /****************************************** BUSINESS LOGIC *******************************************/
    constants:          awilix.asFunction(require('./business-logic-layer/constants')),
    usersManager:       awilix.asFunction(require('./business-logic-layer/users-manager')),

    /************************************************ API ************************************************/
    // Add API related files here...

    /******************************************** APPLICATION ********************************************/
    app:            awilix.asFunction(require('./api/index'))
})

const app = container.resolve('app')



app.listen(3000, function() {
    console.log('Web application listening on port 3000.')
})

