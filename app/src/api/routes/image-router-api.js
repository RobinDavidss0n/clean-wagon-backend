const router = require('express').Router();
const multer = require('multer')

const {uploadFile } = require('../services/s3-bucket');

module.exports = function ({ statusCodes }) {

    const upload = multer({ dest: 'uploads/' })

    router.get('/', (req, res) => {
        console.log('GET /images/');

        res.status(statusCodes.OK).json("Hello from images");
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        console.log('GET /images/ + id');

        res.status(statusCodes.OK).json("Hello from images");
    })
    router.post('/', upload.single('image'), async (req, res) => {
        console.log('POST /images/' + id);

        const image = req.file;
        const result = await uploadFile(image);

        res.status(statusCodes.Created).json(result)
    })

    return router
}