module.exports = function() {
    
    const exports = class ResponseContainer {
        isSuccess = false
        result
        errorCode
        errorStack
        isUpdate = false
        isNewEntry = false
    
        constructor(isSuccess, result, errorCode, errorStack) {
            this.isSuccess = isSuccess
            this.result = result
            this.errorCode = errorCode
            this.errorStack = errorStack
        }
    }

    return exports
}