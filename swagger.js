const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users API 2',
        description: "Users API 2"
    },
    host: 'localhost:3000',
    schemas: ['http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// generate swagger file
swaggerAutogen(outputFile,endpointFiles,doc);