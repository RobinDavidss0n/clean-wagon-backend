const router = require('express').Router();

module.exports = function ({ statusCodes, Coordinate }) {

    router.post('/', async (req, res) => {

        const request = {
            x: req.body.x,
            y: req.body.y,
            journey_id: req.body.journey_id
        }

        const coordinate = new Coordinate(request.journey_id, request.x, request.y)
        const response = await coordinate.insert();

        if (response.isSuccess) {
            res.status(statusCodes.OK).json()
        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode)
        }
    })

    return router
}