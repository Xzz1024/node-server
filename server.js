const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./app/routes');
const fs = require('fs');
const cors = require('cors');
const errorHandler = require('./app/middlewares/error-handler');

const app = express();
const router = express.Router();

// 配置环境变量
app.set('config', config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

app.use((req, res, next) => {

    req.model = req.model || {};
    next();
})

app.use(router);
// mount the routes
router.use('/api/v1', routes);

app.use(errorHandler);

//base route
app.get('/api', (req, res) => {
    res.status(200).json(
        { message: 'Hello! Server is up and running!' }
    );
})

app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)

})