const router = require('express').Router(),
    countries = require('./countries'),
    users = require('./users');



router.use('/countries', countries);
router.use('/users', users)

router.all('*', (req, res) => {
    res.status(404).send({ message: 'Not found'})
})

module.exports = router;