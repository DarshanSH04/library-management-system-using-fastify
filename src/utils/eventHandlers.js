'use strict';

let fastify;

const signalHandler = (fastifyOriginalObject) => {

    fastify = fastifyOriginalObject;

    process.on('uncaughtException', uncaughtHandler);

    process.on('uncaughtRejection', uncaughtHandler);

    process.on('SIGINT',);

    process.on('SIGTERM',);
}

const handlerNotFound = (request, reply) => {

    const responseBody = {
        success: false,
        message: 'Resource not available',
        error: {
            statusCode,
            stack: null,
            message: `Route ${request.method}-${request.url} was not found`,
            name: 'EndpointNotFoundError',
            type: 'custom error'
        }
    };

    fastify.log.error(responseBody.error);

    reply
        .status(statusCode)
        .send(responseBody);
}

const defaultErrorHandler = (error, request, reply) => {
    let statusCode, responseBody;
    const stack = (error.stack || null);
    const reqId = request.id;
    const message = error.message;
    const success = false;

    if (error.validation) {
        statusCode = 400;
        responseBody = {
            success,
            message: `Error in request data ${message}`,
            error: {
                statusCode,
                stack: null,
                message,
                reqId,
                name: 'ValidationError',
                type: 'custom error'
            }
        }
    }
    else if (!error.type) {
        statusCode = 500;
        responseBody = {
            success,
            message: 'Looks like a bug',
            error: {
                statusCode,
                stack,
                message,
                reqId,
                name: error.name,
                type: 'general error'
            }
        }
    }
    else {
        statusCode = error.statusCode;
        responseBody = {
            success,
            message: error.userMessage,
            error: {
                statusCode,
                stack,
                message,
                reqId,
                name: error.name,
                type: error.type
            }
        }
    }

    fastify.log.error(responseBody)

    reply
        .status(statusCode)
        .send(responseBody)
}
