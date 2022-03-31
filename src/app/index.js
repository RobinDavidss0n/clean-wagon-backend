const express = require('express');

module.exports = function() {

    const app = express()
    
    
    app.get('/', function (req, res) {
        res.send('Hello World')
    })

    return app
}
