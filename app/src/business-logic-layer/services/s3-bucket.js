const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

module.exports = function ({ statusCodes }) {

    exports.uploadFile = async function (file) {

        return new Promise((resolve, reject) => {
            if (file === undefined) reject({ errorCode: statusCodes.BadRequest, errorMessage: 'No image in request.' })
            const fileStream = fs.createReadStream(file.path);

            const uploadParams = {
                Bucket: bucketName,
                Body: fileStream,
                Key: file.filename
            }

            s3.upload(uploadParams, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })

    }

    exports.downloadFile = async function (fileId) {

        const downloadParams = {
            Key: fileId,
            Bucket: bucketName
        }
        return new Promise((resolve, reject) => {
            s3.getObject(downloadParams, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    return exports
}