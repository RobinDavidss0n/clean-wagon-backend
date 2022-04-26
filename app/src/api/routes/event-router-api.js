const router = require('express').Router();

const multer = require('multer')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

module.exports = function ({ statusCodes, Event, s3Bucket, googleVision }) {
    const upload = multer({ dest: 'uploads/' })

    router.get('/:event_id', async (req, res) => {
        const event_id = req.params.event_id

        const event = new Event()
        const result = await event.get(event_id)
        if (result.isSuccess) {
            res.status(statusCodes.OK).json(result.result[0]);
        } else if (result.errorCode === 'EventNotFound') {
            res.status(statusCodes.NotFound).json(result);
        } else {
            res.status(statusCodes.InternalServerError).json(result);
        }
    })

    router.get('/by-userid/:user_id', async (req, res) => {
        const user_id = req.params.user_id
        const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit)
        const event = new Event()
        const events = await event.getEventsByUserId(user_id, limit)
        if (events.isSuccess) {
            res.status(statusCodes.OK).json(events.result)
        } else if (events.errorCode === 'EventsNotFound') {
            res.status(statusCodes.NotFound).json({ errorCode: events.errorCode, result: events.result })
        } else {
            console.log(events);
            res.status(statusCodes.InternalServerError).json(events.errorCode)
        }
    })

    router.get('/by-mowerid/:mower_id', async (req, res) => {
        const mower_id = req.params.mower_id
        const limit = req.query.limit === undefined ? 10 : parseInt(req.query.limit)
        const event = new Event()
        const events = await event.getEventsByMowerId(mower_id, limit)
        if (events.isSuccess) {
            res.status(statusCodes.OK).json(events.result)
        } else if (events.errorCode === 'EventsNotFound') {
            res.status(statusCodes.NotFound).json({ errorCode: events.errorCode, result: events.result })
        } else {
            console.log(events);
            res.status(statusCodes.InternalServerError).json(events.errorCode)
        }
    })

    router.post('/', upload.single('image'), async (req, res) => {

        const request = {
            coordinate_id: req.body.coordinate_id,
            event_type: req.body.event_type,
            image: req.file
        }

        try {
            const obj = await googleVision.detectObject(request.image)
            const upl = await s3Bucket.uploadFile(request.image);
            const event = new Event(request.coordinate_id, request.event_type, upl.key, obj)
            const errors = await event.validate()
            if (errors.length === 0) {
                const result = await event.insert();
                result.isSuccess ? res.status(statusCodes.Created).json(event) : res.status(statusCodes.InternalServerError).json({ errorCode: result.errorCode })

            } else if (errors.length > 0) {
                const response = {
                    errorCode: statusCodes.BadRequest,
                    errors: errors.map(err => err.errorMessage)
                }
                res.status(statusCodes.BadRequest).json(response)
            } else {
                console.log(result);
                res.status(statusCodes.InternalServerError).json({ errors: result.errorCode })
            }

        } catch (error) {
            console.log(error);
            res.status(statusCodes.BadRequest).json(error)
        }
    })

    return router
}