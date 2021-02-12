import express from 'express';
import { checkToken } from '../security/security.js';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups/{id}:
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
routes.post('/usersGroups/:id', async (request, response) => {
  const params = request.body;
  // Parameters check
  if(!params.id || !params.token ){
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  // Token check
  const properToken = await checkToken(params.token, params.id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // Insert user affiliated as owner
  sqlInstance.request("INSERT INTO USERS_GROUPS(ID, ID_USER, ID_GROUP, ROLE) VALUES(?, ?, ?, ?)",
    [uuidv4(),
      params.id,
      request.params.id,
      "guest"]).then(result => {
    response.send("");
    response.status(201).end();
  });
});