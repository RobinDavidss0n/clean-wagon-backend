const express = require('express');
// const apiRouter = require('./router-api');

module.exports = function ({ statusCodes, apiRouter }) {


    console.log(statusCodes.NotExtended);

    const app = express()

    app.get('/', function (req, res) {
        res.status(statusCodes.OK).json({ "Hello": "World" }).end();
    })

    app.use('/api', apiRouter)

    return app

}
