/*
* Response Handler
*/
const Logger = require('./logger');

module.exports = (req, res) => {    
    console.log('-------this is response handler----------')
    console.log(req.model)
    if(req.model.response) {       
        const response = req.model.response;  

        //success response model
        let successReponse = {
            success: true,
            data: response.data
        }


        //Log -- starts
        const logOptions = {
            status: 200,
            response: {
                success: true
            }
        }
        Logger.log(req, logOptions); 
        //Log -- end

        res.status(response.status)
            .json(successReponse); 
    } 
    else if(req.model.error) {        
        const error = req.model.error;
        if (error.response) {       

            // The request was made and the server responded with a status code
            let errStatus = error.response.status;
            let errType = '';
            //Overwriding the error status code with 200 status
            let errData = error.response.data;            

            switch(errStatus) {
                case 404:
                    errStatus = 200;
                    errType = 'NO_DATA_FOUND';
                break;

                case 400:
                    errType = 'BAD_REQUEST'
                    if(typeof errData !== 'object' || (typeof errData === 'object' && !errData.hasOwnProperty('errorCode'))) {
                        errData = '';
                    }
                break;

                case 401:
                    errStatus = 200;
                    errType = 'AUTH_FAILED';
                break;

                case 403:
                    errStatus = 200;
                    errType = 'METHOD_NOT_ALLOWED'
                break;

                case 405:
                    errStatus = 200;
                    errType = 'METHOD_NOT_ALLOWED'
                break;                

                default:
                    errType = 'INTERNAL_ERROR'
                break;
            }            
                       
            //error respose model
            let errResponse = {
                success: false,
                error: {
                    code: error.response.status,
                    errorType: errType,
                    details: errData
                }
            }  

            const logOptions = {
                status: errStatus,
                response: {
                    ...errResponse
                }
            }
            
            Logger.log(req, logOptions); 
                  
            res.status(errStatus)   
                .json(errResponse);                               
        } 
        else if (error.request) {                                  
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js                        

            let errStatus = 503;
            let errResponse = {
                success: false,
                error: {
                    code: errStatus,
                    errorType: 'NO_RESPONSE_RECEIVED',
                    details: {
                        message: 'The request was made but no response was received'
                    }
                }
            }  
            const logOptions = {
                status: errStatus,
                response: {
                    ...errResponse
                }
            }
            Logger.log(req, logOptions);   
            
            res.status(errStatus)   
                .json(errResponse);         
        } else {
            // Something happened in setting up the request that triggered an Error   
            let errStatus = 500;
            let errResponse = {
                success: false,
                error: {
                    code: errStatus,
                    errorType: 'INTERNAL_SERVER_ERROR',
                    details: error
                }
            }  

            const logOptions = {
                status: errStatus,
                response: {
                   ...errResponse
                }
            }            
            Logger.log(req, logOptions);       
          
            res.status(errStatus)   
                .json(errResponse)    
            
        }
    }
}