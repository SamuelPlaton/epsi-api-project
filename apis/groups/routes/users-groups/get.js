import { sqlInstance } from '../../index.js';
import express from 'express';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups/user/{id}:
 *   get:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a usersGroups with a user id
 *     responses:
 *      '200':
 *        description: Array containing the usersGroup
 */
routes.get('/usersGroups/user/:id',  async (request, response) => {
    sqlInstance.request('SELECT ID, USER, `GROUP`, MONEY, ROLE FROM USERS_GROUPS WHERE USER = ?', request.params.id).then(result => {
        response.send(result);
    });
});

/**
 * @swagger
 *
 * /usersGroups/group/{id}:
 *   get:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a usersGroups with a group id
 *     responses:
 *      '200':
 *        description: Array containing the usersGroup
 */
routes.get('/usersGroups/group/:id',  async (request, response) => {
    sqlInstance.request('SELECT ID, USER, `GROUP`, MONEY, ROLE FROM USERS_GROUPS WHERE `GROUP` = ?', request.params.id).then(result => {
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
        response.status(400);
        response.send('Bad parameters').end();
        return;
    }
    sqlInstance.request('SELECT ID, USER, `GROUP`, MONEY, ROLE FROM USERS_GROUPS WHERE ID IN (?)', [request.query.ids.join(',')]).then(result => {
        response.send(result);
    });
});

