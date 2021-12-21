'use strict';

/* Schema used for both 4xx and 5xx status errors */
exports.responseSerializer = (statusCode, data) => {

    const responseObject = {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
        }
    }

    if (statusCode.toLowerCase() === '2xx') {
        response.properties.data = data;
    }
    else if (statusCode.toLowerCase() === '4xx' || statusCode.toLowerCase() === '5xx') {
        response.properties.error = {
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                stack: { type: ['string', 'null'] },
                message: { type: 'string' },
                reqId: { type: 'string' },
                name: { type: 'string' },
                code: { type: 'string' },
                type: { type: 'string' }
            }
        }
    }
    return responseObject;
}