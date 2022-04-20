const router = require('express').Router();

const multer = require('multer')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

module.exports = function ({ statusCodes, eventManager }) {
    const upload = multer({ dest: 'uploads/' })

    router.get('/:event_id', async (req, res) => {

        const event_id = req.params.event_id
        const result = await eventManager.getEvent(event_id);

        res.status(statusCodes.OK).json(result);
    })

    router.post('/', upload.single('image'), async (req, res) => {

        const event = {
            coordinate_id: req.body.coordinate_id,
            event_type: req.body.event_type,
            image: req.file
        }

        const result = await eventManager.createEvent(event)

        if(event.image.path != undefined) await unlinkFile(event.image.path)

        if (result.isSuccess) {
            const response = { isSuccess: result.isSuccess, insertId: result.result.insertId }
            res.status(statusCodes.Created).json(response)
        } else if (result.errorCode === 400) {
            res.status(statusCodes.BadRequest).json(result)
        } else {
            res.status(statusCodes.InternalServerError).json(result)
        }
    })

    return router
}