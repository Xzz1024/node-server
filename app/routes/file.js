const router = require('express').Router();
const { fileList, upload } = require('../actions').files;
const responseHandler = require('../middlewares/response-handler');


router.get('/list', fileList, responseHandler);
router.post('/upload', upload, responseHandler);


module.exports = router;