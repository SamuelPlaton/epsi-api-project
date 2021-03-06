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
  const {id, token, money} = request.body.data;
  if(!id || !token || !money ){
    response.status(400);
    response.send('Bad parameters').end();
    return;
  }
  // Token check
  const properToken = await checkToken(token, id);
  if(!properToken){
    response.status(403);
    response.send('Wrong token').end();
    return;
  }

  const sql = "UPDATE USERS_GROUPS SET MONEY = ? WHERE USER = ? AND `GROUP` = ?";
  sqlInstance.request(sql,
    [
      money,
      id,
      request.params.group]).then(result => {
    response.status(200);
    response.send("").end();
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
  if(!request.body.data || !idOwner || !idUser || !token ){
    response.status(400);
    response.send('Bad parameters').end();
    return;
  }
  // Token check
  const properToken = await checkToken(token, idOwner);
  if(!properToken){
    response.status(403);
    response.send('Wrong token').end();
    return;
  }

  // Owner Check
  const properOwner = await checkOwner(idOwner, request.params.group);
  if(!properOwner){
    response.status(403);
    response.send('You are not the owner').end();
    return;
  }

  await sqlInstance.request('UPDATE USERS_GROUPS SET ROLE = "guest" WHERE `GROUP` = ? AND USER = ?', [request.params.group, idOwner]);
  sqlInstance.request('UPDATE USERS_GROUPS SET ROLE = "admin" WHERE `GROUP` = ? AND USER = ?', [request.params.group, idUser]).then(result => {
    response.status(200);
    response.send('permission changed').end();
  })
});