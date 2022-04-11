const router = require('express').Router();

module.exports = function ({ statusCodes, eventManager }) {


    router.get('/', function (req, res) {
        eventManager.getEvent(1);
        res.status(statusCodes.OK).json("Hello from /GET");
    })

    router.get('/:id', (req, res) => {

        const id = req.params.id;

        res.status(statusCodes.OK).json("Hello from ");
    })

    router.get('/journey/:journeyId', async (req, res) => {

        const id = req.params.journeyId;

        res.status(statusCodes.OK).json(id);
    })

    router.post('/', async (req, res) => {

        const data = req.body;

        const result = await eventManager.createEvent(data);
        res.status(statusCodes.OK).json(result);
    })

    return router
}