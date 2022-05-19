const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const vision = require('@google-cloud/vision');
const fs = require('fs');
const json = require('./google-api-key.json');

const CREDENTIALS = JSON.parse(JSON.stringify(json));

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
}

module.exports = function ({ statusCodes }) {

    const client = new vision.ImageAnnotatorClient(CONFIG);

    exports.detectObject = async function (file) {

        return new Promise((resolve, reject) => {
            if (file === undefined) reject({ errorCode: statusCodes.BadRequest, errorMessage: 'No image in request' })
            const request = {
                image: { content: fs.readFileSync(file.path) },
            };

            client.objectLocalization(request).then((res) => {
                const [result] = res;
                console.log(result)
		if (result.localizedObjectAnnotations.length < 1) { return resolve("No objects found.") }
                const objects = result.localizedObjectAnnotations.length > 1 ? result.localizedObjectAnnotations.reduce((acc, obj) => { return acc.name.concat(' ', obj.name) }) : result.localizedObjectAnnotations[0].name
                resolve(objects)
            }).catch((error) => {
		console.log(error)
                reject(error)
            })
        })
    }

    return exports

}
