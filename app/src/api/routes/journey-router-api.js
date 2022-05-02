const router = require('express').Router();

let mock_journey_id = 0;

module.exports = function ({ statusCodes, Journey, Mower, constants, Coordinate }) {
    const err = constants.errorCodes

    router.get('/by-mowerid/:mower_id', async (req, res) => {

        const mower_id = req.params.mower_id

        const mower = new Mower()
        mower.setId(mower_id)
        const response = await mower.getAll('Journeys')

        if (response.isSuccess) {
            res.status(statusCodes.OK).json(response.result)
        } else if (response.errorCode === err.JOURNEY_NOT_FOUND) {
            res.status(statusCodes.NotFound).json(response.errorCode);
        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode);
        }
    })

    router.get('/:journey_id', async (req, res) => {

        const journey_id = req.params.journey_id

        const journey = new Journey()
        const response = await journey.get(journey_id)
        const coordinates = await journey.getAll('Coordinates')

        if (response.isSuccess) {
            res.status(statusCodes.OK).json({ journey: response.result[0], coordinates: coordinates.result })
        } else if (response.errorCode === err.JOURNEY_NOT_FOUND) {
            res.status(statusCodes.NotFound).json(response.errorCode);
        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode);
        }
    })

    router.post('/start-journey', async (req, res) => {

        const request = {
            mower_id: req.body.mower_id
        }

        const journey = new Journey(request.mower_id)
        const response = await journey.insert()

        if (response.isSuccess) {
            res.status(statusCodes.OK).json({ journey_id: response.result.insertId })
        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode)
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
        } else if (response.errorCode === err.JOURNEY_NOT_FOUND) {
            res.status(statusCodes.NotFound).json(response.errorCode)
        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode)
        }

    })

    return router
}