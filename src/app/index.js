const express = require('express');
const app = express()

const PORT = 3000;

app.listen(PORT)

app.get('/', function (req, res) {
    res.send('Hello World')
})
