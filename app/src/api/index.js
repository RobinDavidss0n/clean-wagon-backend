// Toggle testruns:
const willRunTests = true
const express = require('express')    

module.exports = function ({usersTest, statusCodes, apiRouter, imageRouter}) {
    console.log(statusCodes.NotExtended)

    const app = express()

    /****************************** Say hello to visitors *******************************/
    app.get('/', function (req, res) {
        res.status(statusCodes.OK).json({ "Hello": "World" }).end();
    })


    /********************************* Set up router(s) *********************************/
    app.use('/api', apiRouter)
    app.use('/api/v1/images', imageRouter)


    /************************************ Run tests *************************************/
    if (willRunTests) {
        console.log('Running tests...\n')
        usersTest.runAllUsersTests()
    }


    /************************************************************************************/

    return app
}
