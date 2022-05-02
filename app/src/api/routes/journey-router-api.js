const router = require('express').Router();

let mock_journey_id = 0;

module.exports = function ({ statusCodes, Journey, constants, Coordinate }) {
    const err = constants.errorCodes

    router.get('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from journeys");
    })
    router.get('/:id', (req, res) => {

        const id = req.params.id;

        res.status(statusCodes.OK).json("Hello from backend");
    })

    router.post('/start-journey', async (req, res) => {

        const request = {
            mower_id: req.body.mower_id
        }

        const journey = new Journey(request.mower_id);
        const response = await journey.insert();

        if (response.isSuccess) {
            res.status(statusCodes.OK).json({ journey_id: response.result.insertId })
        } else if (response.errorCode === constants.internalError) {
            res.status(statusCodes.internalError).json(response.errorCode)
        } else {
            res.status(statusCodes.BadRequest).json(response.errorCode)
        }
    })

    router.put('/stop-journey', async (req, res) => {

        const request = {
            journey_id: req.body.journey_id,
            x: req.body.x,
            y: req.body.y
        }

        const journey = new Journey()
        const journey_exists = await journey.get(request.journey_id)
        journey.end_time = new Date()
        const journey_updated = await journey.update()
        const coordinate = new Coordinate(request.journey_id, request.x, request.y)
        const coordinate_response = await coordinate.insert()

        const responses = [journey_exists, journey_updated, coordinate_response];

        const response = responses.slice().reduce((acc, obj, index, arr) => {
            return obj.isSuccess === false ? (arr.splice(0), obj) : obj
        })

        if (response.isSuccess) {
            res.status(statusCodes.OK).json()
        } else if (response.errorCode === err.JourneyNotFound) {
            res.status(statusCodes.NotFound).json(response.errorCode)
        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode)
        }

    })

    return router
}