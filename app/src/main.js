const awilix = require('awilix')

const container = awilix.createContainer()

container.register({

    apiRouter: awilix.asFunction(require('./api/router-api')),

    statusCodes: awilix.asFunction(require('./api/statusCodeHandler')),

    app: awilix.asFunction(require('./api/index'))
})


const app = container.resolve('app')



app.listen(3000, function () {
    console.log('Web application listening on port 3000.')
})
