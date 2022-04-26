const router = require('express').Router();
const multer = require('multer')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

module.exports = function ({ statusCodes, s3Bucket }) {

    const upload = multer({ dest: 'uploads/' })

    router.get('/', (req, res) => {

        res.status(statusCodes.OK).json("Hello from images");
    })
    router.get('/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const readStream = await s3Bucket.downloadFile(id)
            var img = Buffer.from(readStream.Body, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);

        } catch (err) {
            res.status(err.statusCode).json({ message: err.message, code: err.code });
        }

    })

    router.post('/', upload.single('image'), async (req, res) => {

        const image = req.file;

        if (image !== undefined) {
            const result = await s3Bucket.uploadFile(image);
            await unlinkFile(image.path);
            res.status(statusCodes.Created).json(result)
        } else {
            res.status(statusCodes.BadRequest).json({ errorCode: 400, errorMessage: 'No image in request.' })
        }
    })

    return router
}