// Toggle true/false:
const willRunTests = true

const express = require('express');

module.exports = function({usersTest}) {

    const app = express()
    
    
    app.get('/', function (req, res) {
        res.send('Hello World')
    })


    /************************************ Run tests *************************************/
    if (willRunTests) {
        console.log('Running tests...\n')
        usersTest.runAllUsersTests()
    }


    /************************************************************************************/

    return app

}
