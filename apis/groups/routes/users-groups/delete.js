import express from 'express';
import { sqlInstance } from '../../index.js';
import { checkToken } from '../security/security.js';

export const routes = express.Router();

// Method DELETE for a group
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
 *              id: string
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
  const params = request.body;

  if (!params.token || !params.id) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  // delete from user himself
  const properToken = await checkToken(params.token, params.id);
  if(!properToken && !params.owner){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  const properOwnerToken = await checkToken(params.token, params.owner);
  if(!properOwnerToken && params.owner){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // todo: check if the user is indeed the owner
  // todo: do a method in security

  sqlInstance.request('DELETE FROM USERS_GROUPS WHERE ID_USER = ? AND ID_GROUP = ?', [params.id, request.params.id]).then(result => {
    response.send('');
    response.status(204).end();
  });

});