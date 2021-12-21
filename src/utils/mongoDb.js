'use strict';

const mongoose = require('mongoose');

const { mongodbConnectionString } = require('./envVariables')

async function databaseServices(fastify) {
    try {
        /* Triggered when Mongoose is disconnected from mongodb server */
        mongoose.connection.on('disconnected', () => {
            fastify.log.warn('Database disconnected');
        });

        /* Triggered when Mongoose is reconnected from mongodb server */
        mongoose.connection.on('reconnected', () => {
            fastify.log.warn('Database reconnected');
        });

        /*Connecting to mongodb server*/
        await mongoose.connect(mongodbConnectionString);
        fastify.log.info('Database connected');
    }
    catch (error) {
        /* Log and exit if failed to connect */
        fastify.log.fatal('Database connection failed');
        fastify.log.fatal(error);
        process.exit(1);
    }
}

/*Called when shutting down db connection due to signals viz SIGINT */
const shutdownDbConnection = (fastify) => {

    fastify.log.warn('Database connection shutdown process started');
    try {
        mongoose.connection.close();
        fastify.log.warn('Database connection shutdown succesful');
    }
    catch (error) {
        fastify.log.error('Database connection shutdown process failed');
        fastify.log.error(error);
    }

}

module.exports = { databaseServices, shutdownDbConnection };