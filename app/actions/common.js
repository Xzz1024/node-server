/*
* Common routes
*/

const axiosInstance = require('../utils/axios-instance'),
    to = require('await-to-js').to,
    queryString = require('querystring');

exports.doEncrypt = async (options) => {
    return await axiosInstance.post('encrypt', options);
}

exports.encrypt = async (req, res, next) => {
    const inputStr = req.body.string,
        base64Encoded = (req.body.base64Encoded) || false;

    let [error, response] = await to(this.doEncrypt({ 
        string: inputStr,
        base64Encoded: base64Encoded 
    }));

    if(error) {
        req.model.error = error;
        return next();
    }
    req.model.response = response;
    return next();
}


exports.decrypt = async (req, res, next) => {
   
    const inputStr = req.body.string,
        base64Decode = (req.body.base64Decode !== undefined) ? req.body.base64Decode : false;
       
    let [error, response] = await to(axiosInstance.post('decrypt', {
        string: inputStr,
        base64Decode: base64Decode 
    }));

    if(error) {
        req.model.error = error;
        return next();
    }
    req.model.response = response;
    return next();
}

exports.getToken = function(uuid) {
    return new Promise((resolve,  reject) => {
        var AWS = require('aws-sdk');
        AWS.config.update({region: 'us-west-2'});
        
        var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});    
        var params = {
        TableName: 'FoundationRegistrationToken',
            Key: {
                'Guid': {S: uuid}
            }
        };        
      
        ddb.getItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);            
                reject(JSON.stringify(err))
            } else {        
                console.log("Success", data.Item);            
                resolve(data.Item)
            }
        });
    })    
}

exports.deleteToken = function(uuid) {
    return new Promise((resolve,  reject) => {
        var AWS = require('aws-sdk');
        AWS.config.update({region: 'us-west-2'});

        var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});        
        var params = {
            TableName: 'FoundationRegistrationToken',
            Key: {
                'Guid': {S: uuid}
            }
        }
        
        ddb.deleteItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                reject(JSON.stringify(err))
            } else {      
                console.log("Success", data);                
                resolve(data)
            }
        });
    })    
}