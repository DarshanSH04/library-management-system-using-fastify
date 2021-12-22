const { v4: uuidv4 } = require('uuid');

const { databaseServices } = require('./utils/mongoDb');

const { signalHandler, handlerNotFound, defaultErrorHandler } = require('./utils/eventHandlers');

const { API_HOST, API_PORT, mongodbConnectionString } = require('./utils/envVariables');

const { name: serviceName } = require('../package.json');

const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    logger: {
        level: 'info'
    },
    disableRequestLogging: true,
    genReqId: uuidv4
});

module.exports = (
    async () => {
        signalHandler(fastify);

        fastify.setNotFoundHandler(handlerNotFound);
        fastify.setErrorHandler(defaultErrorHandler);
    }
)