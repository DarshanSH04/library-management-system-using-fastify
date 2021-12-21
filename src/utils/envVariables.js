'use strict';

const path = require('path');

require('dotenv-safe').config({ path: path.join(__dirname, '/../../.env') });

let { API_HOST,
    API_PORT,
    MONGODB_CONNECTION: mongodbConnectionString
} = process.env;

/*exporting env variables*/
module.exports = {
    API_HOST,
    API_PORT,
    mongodbConnectionString
};
