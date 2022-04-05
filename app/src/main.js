const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    /********************************************** TESTS **********************************************/
    // Add test files here...

    /******************************************* DATA ACCESS *******************************************/
    dbConnection:   awilix.asFunction(require('./data-access-layer/db')),
    queryManager:   awilix.asFunction(require('./data-access-layer/query-manager')),

    /***************************************** BUSINESS LOGIC ******************************************/
    // Add BLL files here...

    /*********************************************** API ***********************************************/
    // Add API related files here...

    /******************************************* APPLICATION *******************************************/
    app:            awilix.asFunction(require('./api/index'))
})

const app = container.resolve('app')



app.listen(3000, function() {
    console.log('Web application listening on port 3000.')
})

