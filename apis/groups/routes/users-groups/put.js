import { sqlInstance } from '../../index.js';
import express from 'express';
import { checkToken } from '../security/security.js';

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

  const sql = "UPDATE USERS_GROUPS SET MONEY = ? WHERE ID_USER = ? AND ID_GROUP = ?";
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
 *            example:
 *              id: owner Id
 *              token: user Token
 *     responses:
 *      '200':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.put('/usersGroups/roles/:group', async (request, response) => {
  const {id, token} = request.body.data;
  if(!id || !token ){
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

  // Owner Check
  const properOwner = await checkOwner(id, request.params.group);
  if(!properOwner){
    response.send('You are not the owner');
    response.status(403).end();
    return;
  }

  const sql = "UPDATE USERS_GROUPS SET MONEY = ? WHERE ID_USER = ? AND ID_GROUP = ?";
  sqlInstance.request(sql,
      [
        money,
        id,
        request.params.id]).then(result => {
    response.send("");
    response.status(200).end();
  });
});