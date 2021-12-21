'use strict';

class DatabaseError extends Error {

    constructor(errorObject) {
        super(errorObject.sourceMessage);

        this.statusCode = 500;
        this.type = 'Database Error';
        this.name = errorObject.name;
        this.userMessage = errorObject.userMessage;
        this.sourceMessage = errorObject.sourceMessage;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError)
        }
    }
}

class ValidationError extends Error {

    constructor(errorObject) {
        super(errorObject.sourceMessage);

        this.statusCode = 400;
        this.type = 'Validation Error';
        this.name = errorObject.name;
        this.userMessage = errorObject.userMessage;
        this.sourceMessage = errorObject.sourceMessage;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError)
        }
    }
}

class ResourceUnavailableError extends Error {

    constructor(errorObject) {
        super(errorObject.sourceMessage);

        this.statusCode = 404;
        this.type = 'Resource Unavailable Error';
        this.name = errorObject.name;
        this.userMessage = errorObject.userMessage;
        this.sourceMessage = errorObject.sourceMessage;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResourceUnavailableError)
        }
    }
}

class DuplicateResourceError extends Error {

    constructor(errorObject) {
        super(errorObject.sourceMessage);

        this.statusCode = 400;
        this.type = 'Duplicate Resource Error';
        this.name = errorObject.name;
        this.userMessage = errorObject.userMessage;
        this.sourceMessage = errorObject.sourceMessage;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateResourceError)
        }
    }
}

class UnauthorizedError extends Error {

    constructor(errorObject) {
        super(errorObject.sourceMessage);

        this.statusCode = 401;
        this.type = 'Unauthorized Error';
        this.name = errorObject.name;
        this.userMessage = errorObject.userMessage;
        this.sourceMessage = errorObject.sourceMessage;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedError)
        }
    }
}

module.exports = { DatabaseError, ValidationError, ResourceUnavailableError, DuplicateResourceError, UnauthorizedError }