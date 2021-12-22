'use strict';

const { shutdownMongoConnection } = require('./mongoDb')
let fastify;

const signalHandler = (fastifyOriginalObject) => {

    fastify = fastifyOriginalObject;

    process.on('uncaughtException', uncaughtHandler);
    process.on('unhandledRejection', uncaughtHandler);

    process.on('SIGINT', startShutdown);
    process.on('SIGTERM', startShutdown);
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

/*
 * This function will be called when the NodeJS process receives a signal to be terminated (manually or otherwise)
 * To make sure that the mongo connection is terminated before the process exits
 */
const startShutdown = (signal) => {

    fastify.log.warn(`Received ${signal}. Shutdown sequence initiated ...`);
    fastify.log.warn('Fastify : SHUTDOWN_STARTED');

    try {
        fastify.close();

        fastify.log.warn('Fastify : SHUTDOWN_SUCCESSFUL');
        shutdownMongoConnection(fastify);
    }
    catch (error) {
        fastify.log.error('Fastify : SHUTDOWN_FAILED');
        fastify.log.error(err);
    }
}

const uncaughtHandler = (err) => {
    fastify.log.error('Uncaught error');
    fastify.log.error(err);
    startShutdown(-5);
    process.exit(-5);
}

module.exports = { signalHandler, handlerNotFound, defaultErrorHandler, startShutdown, uncaughtHandler }