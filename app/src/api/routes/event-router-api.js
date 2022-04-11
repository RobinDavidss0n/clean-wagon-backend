const router = require('express').Router();

const multer = require('multer')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, downloadFile } = require('../services/s3-bucket');
const { detectObject } = require('../services/cloud-vision');

module.exports = function ({ statusCodes, eventManager }) {
    const upload = multer({ dest: 'uploads/' })

    router.get('/:event_id', async (req, res) => {

        const event_id = req.params.event_id
        const result = await eventManager.getEvent(event_id);

        res.status(statusCodes.OK).json(result);
    })

    router.post('/', upload.single('image'), async (req, res) => {

        const image = req.file;
        const coordinate_id = req.body.coordinate_id;
        const event_type = req.body.event_type;
        const upl = await uploadFile(image);

        const obj = await detectObject(image)

        const event = {
            coordinate_id: coordinate_id,
            event_type: event_type,
            filename: image.filename,
            object_desc: obj[0].name
        }
        const result = await eventManager.createEvent(event);
        await unlinkFile(image.path);

        const response = {
            obj,
            upl,
            result
        }
        res.status(statusCodes.Created).json(response)

    })

    return router
}