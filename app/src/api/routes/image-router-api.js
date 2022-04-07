const router = require('express').Router();
const multer = require('multer')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, downloadFile } = require('../services/s3-bucket');

module.exports = function ({ statusCodes }) {

    const upload = multer({ dest: 'uploads/' })

    router.get('/', (req, res) => {

        res.status(statusCodes.OK).json("Hello from images");
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id;

        try {
            const readStream = downloadFile(id);
            readStream.pipe(res)
        } catch (err) {
            console.log(err);
            return res.status(400).json(error);
        }

        // res.status(statusCodes.OK).json("Hello from images");
    })
    router.post('/', upload.single('image'), async (req, res) => {

        const image = req.file;
        const result = await uploadFile(image);

        await unlinkFile(image.path);

        res.status(statusCodes.Created).json(result)
    })

    return router
}