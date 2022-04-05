const ResponseContainer = require('./classes/response-container-class')

module.exports = function({dbConnection}) {
    const exports = {}

    /**
     * Sends the input query into the db and returns the results (or errors).
     * @param {string} query 
     * @param {Array<any>} values 
     * @param {string} resourceName 
     * @returns {Promise<ResponseContainer>}
     */
    exports.runQuery = function(query, values=[], resourceName) {
        
        const connection = dbConnection.getConnection()
        const notFoundError = resourceName + 'NotFound'

        return new Promise(resolve => {
            
            connection.connect(function(error) {
                if (error) {
                    console.log('db.connect error: ', error)
                }
            })
            
            connection.query(query, values, function(error, response) {
                
                isSuccess = true
                errorCode = ''
               
                if (error) {
                    console.log(error.stack)
                    isSuccess = false
                    errorCode = 'internalError'
                } else if (Array.isArray(response) && !response.length) {
                    isSuccess = false,
                    errorCode = notFoundError                
                }

                resolve(new ResponseContainer(
                    isSuccess,
                    response,
                    errorCode,
                    error?.stack
                ))
            })

            connection.end(function(error) {
                if (error) {
                    console.log('db.end error: ', error)
                }
            })
        })
    }
    
    return exports
}