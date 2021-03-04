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
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            groups:
 *              type: string
 *            example:
 *              groups: true
 *     responses:
 *      '200':
 *        description: User data is retrieved
 *
 *
 */
routes.get('/users/:id', (request, response) => {
  // Retrieve our Users, his sectors and services affiliated
  const includes = request.body;
  // Setup our default query and param
  const query = ['SELECT U.FIRSTNAME, U.LASTNAME, U.GENDER, U.EMAIL, U.REGISTER_DATE, U.PHONE, U.PROFILE_PICTURE FROM USERS U WHERE U.ID = ?'];
  const queryParams = [request.params.id];
  // Our queries index result
  const idx = [0, null, null, null];
  let acc = 0;
  // Everytime an include is settled, we increment the index result
  if(includes){
    // todo: do right inclusion
    if(includes.groups){
      query.push('SELECT * FROM USERS_GROUPS US WHERE US.ID_USER = ?');
      queryParams.push(request.params.id);
      acc += 1;
      idx[1] = acc;
    }
  }
  // Set our final query
  sqlInstance.request(query.join(';'), queryParams).then(result => {
    response.send({
      user: result[idx[0]],
      groups : result[idx[1]],
    });
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
  if (!request.body.ids) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  sqlInstance.request('SELECT ID, FIRSTNAME, LASTNAME, GENDER, EMAIL, REGISTER_DATE, BIRTH_DATE, PHONE FROM USERS WHERE ID IN (?)', [request.body.ids]).then(result => {
    response.send(result);
  });
});
