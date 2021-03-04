import { sqlInstance } from '../../index.js';
import express from 'express';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups/{id}:
 *   get:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a usersGroups
 *     responses:
 *      '200':
 *        description: Array containing the usersGroup
 */
routes.get('/usersGroups/:id',  async (request, response) => {
    sqlInstance.request('SELECT ID, USER, GROUP, MONEY, ROLE FROM USERS_GROUPS WHERE ID = ?', request.params.id).then(result => {
        response.send(result);
    });
});

// Method GET of all selected users groups data
/**
 * @swagger
 *
 * /usersGroups:
 *   get:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of users groups from the database
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
 *        description: Array of users groups
 *      '400':
 *        description: Bad parameters
 *
 *
 */
routes.get('/usersGroups', (request, response) => {
    if (!request.query.ids) {
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }
    sqlInstance.request('SELECT ID, USER, GROUP, MONEY, ROLE FROM USERS_GROUPS WHERE ID IN (?)', [request.query.ids.join(',')]).then(result => {
        response.send(result);
    });
});

