
const Logger = require('./logger');

module.exports = (req, res) => {   
    if(req.model.response) {
        const response = req.model.response;   
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
            .json(response.data);
    } 
    else if(req.model.error) {
        const error = req.model.error;
        if (error.response) {  

            const logOptions = {
                status: error.response.status,
                response: {
                    error: error.response.data
                }
            }
            Logger.log(req, logOptions);

            res.status(error.response.status)   
                .json(error.response.data)                                    
        } 
        else if (error.request) {                                  
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js 
            const logOptions = {
                status: 503,
                response: {
                    error: error.request
                }
            }
            Logger.log(req, logOptions);

            res.status(503)   
                .json({
                    error: 'oops! something went wrong! Please try again later.'
                });         
        } else {
            // Something happened in setting up the request that triggered an Error  
            
            const logOptions = {
                status: 500,
                response: {
                    error: error
                }
            }
            Logger.log(req, logOptions);

            res.status(500)   
                .json({
                    error
                })    
            
        }
    }
}