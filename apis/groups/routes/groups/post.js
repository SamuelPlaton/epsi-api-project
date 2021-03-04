import { v4 as uuidv4 } from 'uuid';
import { sqlInstance } from '../../index.js';
import express from 'express';
import { checkToken } from '../security/security.js';

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
  const params = request.body;
  const uuidGroup = uuidv4();
  // Parameters check
  if(!params.id || !params.token || !params.title ){
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
  // Insert group
  sqlInstance.request("INSERT INTO BUDGET_GROUPS(ID, TITLE, DESCRIPTION, BUDGET) VALUES(?, ?, ?, ?)",
    [uuidGroup,
      params.title,
      params.description ?? "",
      params.budget ?? 0]).then(result => {
    return result;
  });

  // Insert user affiliated as owner
  sqlInstance.request("INSERT INTO USERS_GROUPS(ID, ID_USER, ID_GROUP, ROLE) VALUES(?, ?, ?, ?)",
    [uuidv4(),
      params.id,
      uuidGroup,
      "owner"]).then(result => {
    response.send("");
    response.status(201).end();
  });
});
