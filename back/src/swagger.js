import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
    host: 'localhost:5001',
    basePath: '/',
  },
  apis: ['./src/board/postRouter.mjs', './src/board/postSchema.mjs', './src/user/userRouter.mjs'],
};

const specs = swaggereJsdoc(options);

export { swaggerUi, specs };
