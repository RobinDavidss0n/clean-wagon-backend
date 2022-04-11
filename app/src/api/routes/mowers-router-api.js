const router = require('express').Router();

module.exports = function ({ statusCodes, mowersManager }) {

    //TODO: Not used?
    router.get('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from backend");
    })


    router.get('by-user-id/:id', (req, res) => {
        const id = req.params.id
        const response = await mowersManager.getMowersByUserId(id)

        res.status(statusCodes.OK).json(response);
    })


    router.get('by-serial/:serial', (req, res) => {
        const serial = req.params.serial
        const response = await mowersManager.getMowerBySerial(serial)

        res.status(statusCodes.OK).json(response);
    })


    //TODO: Not used?
    router.post('/', (req, res) => {

        res.status(statusCodes.OK).json("Hello from backend");
    })


    //TODO: Not used?
    router.patch('/:id', (req, res) => {
        const id = req.params.id;

        res.status(statusCodes.OK).json(id);
    })


    //TODO: Not used?
    router.delete('/:id', (req, res) => {
        const id = req.params.id;

        res.status(statusCodes.NoContent).json(id);
    })

    return router
}