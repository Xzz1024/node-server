/*
* Console log middlerware for Linux syslog capture
*/

const Logger = {
    log: function(req, options) {
        const logData = {
            url: req.originalUrl,
            method: req.method,
            statusCode: options.status,            
            response: options.response,
            time: Date()
        }    
        console.log(JSON.stringify(logData));
    }   
}

module.exports = Logger;