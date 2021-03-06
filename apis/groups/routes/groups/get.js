import { sqlInstance } from '../../index.js';
import express from 'express';

export const routes = express.Router();

/**
 * @swagger
 *
 * /groups/{id}:
 *   get:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a group
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            users:
 *              type: string
 *            example:
 *              users: string
 *     responses:
 *      '200':
 *        description: Array containing the group and the usersGroups affiliated
 */
routes.get('/groups/:id',  async (request, response) => {
  // Retrieve our Groups and his users groups affiliated
  const includes = request.query.includes;
  // Setup our default query and param
  const query = ['SELECT ID, TITLE, DESCRIPTION, BUDGET, CODE FROM GROUPS WHERE ID = ?'];
  const queryParams = [request.params.id];
  // Our queries index result
  const idx = [0, null];
  let acc = 0;
  // Everytime an include is settled, we increment the index result
  if(includes){
    if(includes.indexOf('users') !== -1){
      query.push('SELECT ID, USER, `GROUP`, MONEY, ROLE FROM USERS_GROUPS US WHERE `GROUP` = ?');
      queryParams.push(request.params.id);
      acc += 1;
      idx[1] = acc;
    }
  }
  // Set our final query
  sqlInstance.request(query.join(';'), queryParams).then(result => {
    response.send({
      group: result[idx[0]],
      users : result[idx[1]],
    });
  });
});

// Method GET of all selected groups data
/**
 * @swagger
 *
 * /groups:
 *   get:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of groups from the database
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
 *        description: Array of groups
 *      '400':
 *        description: Bad parameters
 *
 *
 */
routes.get('/groups', (request, response) => {
  const {ids} = request.query;
  if (!ids) {
    response.send('-1');
    response.status(400).end();
    return;
  }
  sqlInstance.request('SELECT ID, TITLE, DESCRIPTION, BUDGET, CODE FROM GROUPS WHERE ID IN (?)', [ids.split(',')]).then(result => {
    response.send(result);
  });
});

