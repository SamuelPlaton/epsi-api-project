import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {sqlInstance} from '../../index.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups:
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
 *            code:
 *              type: string
 *            example:
 *              id: user Id
 *              token: string
 *              code: group code
 *     responses:
 *      '201':
 *        description: Posted
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.post('/usersGroups', async (request, response) => {
    const {id, token, code} = request.body.data;
    // Parameters check
    if (!id || !token || !code) {
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }

    const group = await sqlInstance.request("SELECT ID FROM GROUPS WHERE CODE = ?", [code]).then(response => {
            return response[0];
    });
    // If no group found send -1
    if(!group){
        response.send('-1');
        response.status(400).end();
        return;
    }
    const idGroup = group["ID"];
    // Check if user already in group
    const userAlreadyInGroup = await sqlInstance.request("SELECT * FROM USERS_GROUPS WHERE `GROUP` = ? AND USER = ? LIMIT 1",
        [idGroup, id]).then(result => {
        return result[0];
    });
    if (userAlreadyInGroup) {
        response.send('-2');
        response.status(403).end();
        return;
    }

    // Insert user affiliated as owner
    sqlInstance.request("INSERT INTO USERS_GROUPS(ID, USER, TOKEN, `GROUP`, ROLE, MONEY) VALUES(?, ?, ?, ?, ?, ?)",
        [uuidv4(), id, token, idGroup, "guest", 0]).then(result => {
        response.send(idGroup);
        response.status(201).end();
    });
});