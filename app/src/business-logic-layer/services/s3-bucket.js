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

module.exports = function ({ }) {

    exports.uploadFile = async function (file) {
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
        }

        return s3.upload(uploadParams).promise()
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

        try {
            const downloadParams = {
                Key: fileId,
                Bucket: bucketName
            }


            // var s3object = (await s3.getObject({ Bucket: bucket, Key: filename }).promise()); 
            const data = await s3.getObject(downloadParams).promise()

            var csvreadstream = new stream.Readable();
            csvreadstream._read = () => { };
            csvreadstream.push(data.Body);



            console.log('Data');
            console.log(data);

            return csvreadstream

        } catch (e) {
            console.log('e');
            console.log(e.message);
            console.log(e);
            return e
        }
    }

    return exports
}