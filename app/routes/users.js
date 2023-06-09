const express = require('express');
const {
    createUser,
    test} = require('../actions').users;

const responseHandler = require('../middlewares/response-handler');

const router = express.Router();



router.post('/', createUser, responseHandler);

router.get('/test', test, responseHandler);

module.exports = router;

