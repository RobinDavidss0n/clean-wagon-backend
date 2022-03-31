const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    app:            awilix.asFunction(require('./app/index'))
})

const app = container.resolve('app')



app.listen(3000, function() {
    console.log('Web application listening on port 3000.')
})

