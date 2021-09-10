class HttpError extends Error {
    // get message and error code as arguement
    constructor(message, errorCode) {
        // add a message property
        super(message);
        // add a code property
        this.code = errorCode 
    }
}

module.exports = HttpError