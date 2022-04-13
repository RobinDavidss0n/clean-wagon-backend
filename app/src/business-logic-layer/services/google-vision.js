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

module.exports = function ({ }) {

    const client = new vision.ImageAnnotatorClient(CONFIG);

    exports.detectObject = async function (file) {

        const request = {
            image: { content: fs.readFileSync(file.path) },
        };

        const [result] = await client.objectLocalization(request);
        if (result.localizedObjectAnnotations.length < 1) { return "No objects found."}
        const objects = result.localizedObjectAnnotations.length > 1 ? result.localizedObjectAnnotations.reduce((acc, obj) => { return acc.name.concat(' ', obj.name) }) : result.localizedObjectAnnotations[0].name
        return objects;
    }

    return exports

}