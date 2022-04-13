const ResponseContainer = require('../data-access-layer/classes/response-container-class')

module.exports = function ({ constants, eventRepo, s3Bucket, googleVision }) {

    const exports = {}
    const errorCodes = constants.errorCodes

    /**
     * Validates and stores a new user to the data source.
     * @param {Coordinate} coordinate
     * @returns {Promise<ResponseContainer>}
     */
    exports.createEvent = async function (event) {

        if (event.image === undefined || event.image === '') {return { errorCode: 400, errorMessage: 'No image in request.'}}
        if (event.coordinate_id === undefined || event.coordinate_id === '') {return { errorCode: 400, errorerrorMessage: 'No coordinate_id in request.'}}
        if (event.event_type === undefined || event.event_type === '') {return { errorCode: 400, errorMessage: 'No event_type in request.'}}

        const obj = await googleVision.detectObject(event.image)
        const upl = await s3Bucket.uploadFile(event.image);
        const data = {
            coordinate_id: event.coordinate_id,
            event_type: event.event_type,
            filename: event.image.filename,
            object_desc: obj
        }
        return await eventRepo.createEvent(data)
    }

    exports.getEvent = async function (eventId) {
        return await eventRepo.getEvent(eventId)
    }

    return exports

}