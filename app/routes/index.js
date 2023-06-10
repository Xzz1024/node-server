const router = require('express').Router(),
    countries = require('./countries'),
    files = require('./file')
users = require('./users');



router.use('/countries', countries);
router.use('/users', users)
router.use('/file', files)

router.all('*', (req, res) => {
    res.status(404).send({ message: 'Not found' })
})

module.exports = router;