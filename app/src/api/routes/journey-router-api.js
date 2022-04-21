const router = require('express').Router();

let mock_journey_id = 0;

module.exports = function ({ statusCodes }) {

    router.get('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.get('/:id', (req, res) => {

        const id = req.params.id;

        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.post('/start-journey', (req, res) => {

        mock_journey_id ++

        res.status(statusCodes.OK).json(mock_journey_id);

    })
    router.post('/stop-journey', (req, res) => {

        res.status(statusCodes.OK).json("journey id"+mock_journey_id+"stopped :)");

    })

    return router
}