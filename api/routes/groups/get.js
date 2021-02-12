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
 *        description: Array containing the group and the users affiliated
 */
// todo: handle users affiliated
routes.get('/groups/:id', (request, response) => {
  // Retrieve our Service, his sectors and users affiliated
  const includes = request.body;
  // Default query
  sqlInstance.request('SELECT * FROM BUDGET_GROUPS WHERE ID = ?', [request.params.id]).then(result => {

    // Everytime an include is settled, we increment the index result
    if (includes.users) {
      sqlInstance.request('SELECT * FROM USERS_GROUPS WHERE ID_GROUP = ?', request.params.id).then(optionalResult => {
        // We send formatted data
        response.send({
          group: result[0],
          users: optionalResult,
        }).end();
        return;
      });
    }
    response.send({
      group: result[0],
    }).end();
  });
});
