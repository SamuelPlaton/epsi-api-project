import { sqlInstance } from '../../index.js';
import express from 'express';
import { checkOwner, checkToken } from '../security/security.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /usersGroups/{groupId}:
 *   put:
 *     tags:
 *       - usersGroups
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
routes.put('/usersGroups/:group', async (request, response) => {
  const {id, token, money} = request.body;
  if(!id || !token || !money ){
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  // Token check
  const properToken = await checkToken(token, id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  const sql = "UPDATE USERS_GROUPS SET MONEY = ? WHERE USER = ? AND GROUP = ?";
  sqlInstance.request(sql,
    [
      money,
      id,
      request.params.group]).then(result => {
    response.send("");
    response.status(200).end();
  });
});

/**
 * @swagger
 *
 * /usersGroups/roles/{groupId}:
 *   put:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Change admin role of a group
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            idOwner:
 *              type: string
 *            idUser:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              idOwner: owner Id
 *              idUser: user Id
 *              token: owner Token
 *     responses:
 *      '200':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.put('/usersGroups/roles/:group', async (request, response) => {
  const {idOwner, idUser, token} = request.body.data;
  if(!idOwner || !idUser || !token ){
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  // Token check
  const properToken = await checkToken(token, idOwner);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // Owner Check
  const properOwner = await checkOwner(idOwner, request.params.group);
  if(!properOwner){
    response.send('You are not the owner');
    response.status(403).end();
    return;
  }

  await sqlInstance.request('UPDATE USERS_GROUPS SET ROLE = "guest" WHERE GROUP = ? AND USER = ?', [request.params.group, idOwner]);
  sqlInstance.request('UPDATE USERS_GROUPS SET ROLE = "admin" WHERE GROUP = ? AND USER = ?', [request.params.group, idUser]).then(response => {
    response.send("permission changed");
    response.status(200).end();
  })
});