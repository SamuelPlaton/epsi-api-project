import { sqlInstance } from '../../index.js';
import express from 'express';
import { checkToken } from '../security/security.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups/{id}:
 *   put:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Update users groups
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
 *            money:
 *              type: float
 *            example:
 *              id: user Id
 *              token: user Token
 *              money: float
 *     responses:
 *      '200':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.put('/usersGroups/:id', async (request, response) => {
  const params = request.body;
  if(!params.id || !params.token || !params.money ){
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

  // todo: allow role change by owner
  const sql = "UPDATE USERS_GROUPS SET MONEY = ? WHERE ID_USER = ? AND ID_GROUP = ?";
  sqlInstance.request(sql,
    [
      params.money,
      params.id,
      request.params.id]).then(result => {
    response.send("");
    response.status(200).end();
  });
});