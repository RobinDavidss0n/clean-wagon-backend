const router = require('express').Router();

module.exports = function ({ statusCodes }) {

    router.get('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.post('/', (req, res) => {
        res.status(statusCodes.OK).json("Hello from backend");
    })
    router.patch('/:id', (req, res) => {
        const id = req.params.id;
        res.status(statusCodes.OK).json(id);
    })
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        res.status(statusCodes.NoContent).json(id);
    })

    return router
}