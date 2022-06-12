import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    host: 'localhost:5000',
    basePath: '/',
  },
  apis: ['./board/post-router.mjs'],
};

const specs = swaggereJsdoc(options);

export { swaggerUi, specs };
