const router = require('express').Router();

module.exports = function ({ statusCodes, coordinateManager }) {

    router.get('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.get('/:id', (req, res) => {

        const id = req.params.id;

        res.status(statusCodes.OK).json("Hello from backend");
    })
    
    router.post('/', async (req, res) => {

        const coordinate = {
            x: req.body.x,
            y: req.body.y,
            journey_id: req.body.journey_id
        }
        const result = await coordinateManager.createCoordinate(coordinate)

        res.status(statusCodes.OK).json(result);
    })

    return router
}