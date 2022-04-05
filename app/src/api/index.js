// Toggle true/false:
const willRunTests = true

const express = require('express');
// const apiRouter = require('./router-api');


module.exports = function ({ usersTest, statusCodes, apiRouter }) {


    console.log(statusCodes.NotExtended);


    const app = express()

    app.get('/', function (req, res) {
        res.status(statusCodes.OK).json({ "Hello": "World" }).end();
    })


    app.use('/api', apiRouter)


    /************************************ Run tests *************************************/
    if (willRunTests) {
        console.log('Running tests...\n')
        usersTest.runAllUsersTests()
    }


    /************************************************************************************/


    return app

}
