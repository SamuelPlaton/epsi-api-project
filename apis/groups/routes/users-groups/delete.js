import express from 'express';
import { sqlInstance } from '../../index.js';
import {checkToken, checkOwner} from '../security/security.js';

export const routes = express.Router();

// Method DELETE for a users group
/**
 * @swagger
 *
 * /usersGroups/{id}:
 *   delete:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Delete a user from a group (himself or anyone if the user is owner)
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            token:
 *              type: string
 *            id:
 *              type: string
 *            owner:
 *              type: string
 *            example:
 *              token: string
 *              id: user id
 *              owner: id owner (optional)
 *     responses:
 *      '204':
 *        description: DELETED
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 */
routes.delete('/usersGroups/:id', async (request, response) => {
  const {token, id, owner} = request.body;

  if (!token || !id) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  // delete from user himself
  const properToken = await checkToken(token, id);
  if(!properToken && !owner){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  const properOwnerToken = await checkToken(token, owner);
  if(!properOwnerToken && owner){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  const checkedOwner = await checkOwner(owner, request.params.id);

  if(owner && !checkedOwner){
    response.send('You are not the owner');
    response.status(403).end();
    return;
  }

  if(owner === id){
    response.send('You must set a new owner first');
    response.status(403).end();
    return;
  }

  sqlInstance.request('DELETE FROM USERS_GROUPS WHERE USER = ? AND `GROUP` = ?', [id, request.params.id]).then(result => {
    response.send('');
    response.status(204).end();
  });

});

// Method DELETE for all user group of a user
/**
 * @swagger
 *
 * /usersGroups/user/{id}:
 *   delete:
 *     tags:
 *       - usersGroups
 *     produces:
 *       - application/json
 *     summary:
 *       - Delete a user from all of his groups
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            id:
 *              type: string
 *            owner:
 *              type: string
 *            example:
 *              token: string
 *     responses:
 *      '204':
 *        description: DELETED
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 */
routes.delete('/usersGroups/user/:id', async (request, response) => {
  const {token} = request.body;

  if (!token) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  // delete from user himself
  const properToken = await checkToken(token, request.params.id);
  if(!properToken) {
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // Get groups where user is the admin
  const usersGroups = await sqlInstance.request('SELECT * FROM USERS_GROUPS WHERE ROLE = "admin" AND USER = ?', [request.params.id]).then(result => {
    return result.map(r => r['group']);
  });

  // Delete the users groups
  await sqlInstance.request('DELETE FROM USERS_GROUPS WHERE `GROUP` IN (?) OR USER = ?', [usersGroups.join(','), request.params.id]);

  // then delete the groups
  await sqlInstance.request('DELETE FROM GROUPS WHERE ID IN (?)', [usersGroups.join(',')]).then(result => {
    response.send('');
    response.status(204).end();
  });



});