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

const client = new vision.ImageAnnotatorClient(CONFIG);

detectObject = async (file) => {

    const request = {
        image: { content: fs.readFileSync(file.path) },
    };

    const [result] = await client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    return objects;
}

module.exports = {
    detectObject
}