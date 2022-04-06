const router = require('express').Router();
const multer = require('multer')

const { uploadFile, downloadFile } = require('../services/s3-bucket');

module.exports = function ({ statusCodes }) {

    const upload = multer({ dest: 'uploads/' })

    router.get('/', (req, res) => {

        res.status(statusCodes.OK).json("Hello from images");
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id;

        const readStream = downloadFile(id);
        readStream.pipe(res)

        // res.status(statusCodes.OK).json("Hello from images");
    })
    router.post('/', upload.single('image'), async (req, res) => {

        const image = req.file;
        const result = await uploadFile(image);

        res.status(statusCodes.Created).json(result)
    })

    return router
}