// users actions

const axiosInstance = require('../utils/axios-instance');
const to = require('await-to-js').to;
const common = require('./common');

const ERROR_401_RES = {
    response: {
        status: 401,
        error: {
            message: 'Unauthorized.'
        }
    }
}

exports.test = async(req, res, next) =>{
    let error, 
    response;        

    // const userData = req.body;
    [error, response] = await to(axiosInstance.get('helloTest'));
   // 接口报错处理
   if(error) {
        console.log('------------',error)
        req.model.error = error;
        return next();
    }
    console.log('===============',response)
    req.model.response = response;
    console.log(req.model.response)
    return next();
}


exports.createUser = async (req, res, next) => {
    let error, 
        response;        

    const userData = req.body;
    // [error, response] = await to(axiosInstance.get('countries', userData));

    // 接口报错处理
    if(error) {
        console.log('------------',error)
        req.model.error = error;
        return next();
    }
 
    const data = {
        "status": 200,
        "statusText": 'OK',
        "data": "0"
    }
    req.model.response = data;
    console.log(req.model.response)
    return next();
}


