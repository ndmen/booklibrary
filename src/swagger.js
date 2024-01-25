const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'RESTful API for managing a library with user roles and error handling',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Update the URL based on your server configuration
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
    },
    apis: ['./src/routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };