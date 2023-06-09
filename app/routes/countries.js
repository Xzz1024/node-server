const router = require('express').Router();
const { countriesList } = require('../actions').countries;
const responseHandler = require('../middlewares/response-handler');


router.get('/', countriesList, responseHandler);

module.exports = router;