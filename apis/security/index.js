import SQLInstance from './SQLInstance.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';
import { deleteUserRouter, getUserRouter, postUserRouter, putUserRouter } from './routes/users/index.js';

// Enable .env config variables
dotenv.config();
// Setup our sql instance
export const sqlInstance = new SQLInstance(process.env.API_HOST, process.env.API_PORT, process.env.API_USER, process.env.API_PASSWORD, process.env.API_DATABASE);
sqlInstance.connect();

// Define our swagger doc
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Documentation',
      description: 'This is our Microservices app api doc',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// Create our express App
export const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// User routes
app.use('/', postUserRouter);
app.use('/', getUserRouter);
app.use('/', deleteUserRouter);
app.use('/', putUserRouter);

// Make our app listen to port 3001
app.listen(3001);

