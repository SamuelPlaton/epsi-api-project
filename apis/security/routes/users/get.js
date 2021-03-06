import express from 'express';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();

// Method GET of all data of a user
/**
 * @swagger
 *
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a user
 *     responses:
 *      '200':
 *        description: User data is retrieved
 *
 *
 */
routes.get('/users/:id', (request, response) => {
  sqlInstance.request('SELECT U.firstname, U.lastname, U.email, U.register_date FROM USERS U WHERE U.ID = ?', request.params.id).then(result => {
    response.send(result);
  });
});

// Method GET of all selected users data
/**
 * @swagger
 *
 * /users:
 *   get:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of users from the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ids:
 *                type: array
 *            example:
 *              ids: [1, 2, 3]
 *
 *     responses:
 *      '200':
 *        description: Array of users
 *      '400':
 *        description: Bad parameters
 *
 *
 */
routes.get('/users', (request, response) => {
  if (!request.query.ids) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  sqlInstance.request('SELECT id, firstname, lastname, email, register_date FROM USERS WHERE ID IN (?)', [request.query.ids.split(',')]).then(result => {
    response.send(result);
  });
});
