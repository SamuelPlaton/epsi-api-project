import {v4 as uuidv4} from 'uuid';
import {sqlInstance} from '../../index.js';
import faker from 'faker';
import express from 'express';
import {checkCode} from '../security/security.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /groups:
 *   post:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Add a group to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            budget:
 *              type: float
 *            id:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              id: user Id
 *              token: string
 *              title: string
 *              description: string
 *              budget: float
 *     responses:
 *      '201':
 *        description: Posted
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.post('/groups', async (request, response) => {
    const params = request.body.data;
    const uuidGroup = uuidv4();
    // Parameters check
    if (!params.id || !params.token || !params.title) {
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }

    let generatedCode = faker.random.number({min: 100000, max: 999999});
    let codeAlreadyExist = await checkCode(generatedCode);

    while (codeAlreadyExist) {
        let generatedCode = faker.random.number({min: 100000, max: 999999});
        let codeAlreadyExist = await checkCode(generatedCode);
    }

    // Insert group
    await sqlInstance.request("INSERT INTO GROUPS(ID, TITLE, DESCRIPTION, BUDGET, CODE) VALUES(?, ?, ?, ?, ?)",
        [uuidGroup,
            params.title,
            params.description ?? "",
            params.budget ?? 0,
            generatedCode
        ]).then(result => {
        return result;
    });

    const uuidUserGroup = uuidv4();
    // Insert user affiliated as owner
    await sqlInstance.request("INSERT INTO USERS_GROUPS(ID, USER, MONEY, ROLE, TOKEN, `GROUP`) VALUES(?, ?, ?, ?, ?,  ?)",
        [uuidUserGroup, params.id, 0, 'admin', params.token, uuidGroup]).then(result => {
        response.send(uuidGroup);
        response.status(201).end();
    });
});
