const router = require('express').Router();

const multer = require('multer')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

module.exports = function ({ statusCodes, Mower, Event, Coordinate, s3Bucket, googleVision, constants }) {
    const err = constants.errorCodes
    const upload = multer({ dest: 'uploads/' })

    router.get('/:event_id', async (req, res) => {
        const event_id = req.params.event_id

        const event = new Event()
        const response = await event.get(event_id)

        if (response.isSuccess) {
            res.status(statusCodes.OK).json(response.result[0]);

        } else if (response.errorCode === err.EVENT_NOT_FOUND) {
            res.status(statusCodes.NotFound).json(response.errorCode);

        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode);
        }
    })


    router.get('/by-mowerid/:mower_id', async (req, res) => {
        const mower_id = req.params.mower_id
        const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit)

        const mower = new Mower()
        mower.setId(mower_id)

        const response = await mower.getFrom('Events', limit)

        response.result.array.forEach(event => {
            let coordinate = new Coordinate().get(event.coordinate_id)
            let time = coordinate.time
            event["time"] = time
        });


        if (response.isSuccess) {
            res.status(statusCodes.OK).json(response.result)

        } else if (response.errorCode === err.EVENT_NOT_FOUND) {
            res.status(statusCodes.NotFound).json(response.errorCode)

        } else {
            res.status(statusCodes.InternalServerError).json(response.errorCode)
        }
    })

    router.post('/', upload.single('image'), async (req, res) => {

        const request = {
            mower_id: req.body.mower_id,
            coordinate_id: req.body.coordinate_id,
            event_type: req.body.event_type,
            image: req.file
        }

        try {
            const obj = await googleVision.detectObject(request.image)
            const upl = await s3Bucket.uploadFile(request.image)

            const event = new Event(request.mower_id, request.coordinate_id, request.event_type, upl.key, obj)
            const response = await event.insert()

            const coordinate = new Coordinate()
            await coordinate.get(request.coordinate_id)
            coordinate.is_event = true
            await coordinate.update()

            if (response.isSuccess) {
                res.status(statusCodes.Created).json(event)

            } else if (response.errorCode === err.VALIDATION_ERROR) {
                res.status(statusCodes.BadRequest).json(response.errorStack)

            } else {
                res.status(statusCodes.InternalServerError).json(response.errorCode)
            }

        } catch (error) {
            console.log(error);
            res.status(statusCodes.BadRequest).json(err.INTERNAL_ERROR)
        }
    })

    return router
}