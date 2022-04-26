const router = require('express').Router();

let mock_coordinate_id = 0;

module.exports = function ({ statusCodes }) {

    router.get('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.get('/:id', (req, res) => {

        const id = req.params.id;

        res.status(statusCodes.OK).json("Hello from backend");
    })
    
    router.post('/', async (req, res) => {

        mock_coordinate_id ++

        const coordinate = {
            x: req.body.x,
            y: req.body.y,
            journey_id: req.body.journey_id
        }
        // const result = await coordinateManager.createCoordinate(coordinate)

        console.log(coordinate);

        res.status(statusCodes.OK).json(mock_coordinate_id);
    })

    return router
}