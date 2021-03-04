import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {sqlInstance} from '../../index.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups/{code}:
 *   post:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Join a group as a guest
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            id:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              id: user Id
 *              token: string
 *     responses:
 *      '201':
 *        description: Posted
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.post('/usersGroups/:code', async (request, response) => {
    const {id, token} = request.body.data;
    // Parameters check
    if (!id || !token) {
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }

    const idGroup = await sqlInstance.request("SELECT ID FROM GROUPS WHERE CODE = ?", [request.params.code]).then(response => response[0]["ID"])
    console.log(idGroup);
    // Insert user affiliated as owner
    sqlInstance.request("INSERT INTO USERS_GROUPS(ID, USER, TOKEN, `GROUP`, ROLE, MONEY) VALUES(?, ?, ?, ?, ?, ?)",
        [uuidv4(), id, token, idGroup, "guest", 0]).then(result => {
        response.send("");
        response.status(201).end();
    });
});