module.exports = function({}) {

    const exports = {};

    
    /**
         * Returns a random string of chars with the specified length
         * @param {number} length 
         * @returns {string}
         */
     exports.getRandomString = function(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyz'
        randomString = ''
       
        for (let i = 0; i < length; i++) {
            randomString += charset[Math.floor(Math.random() * charset.length)]
        }
        return randomString
    }


    return exports

}
