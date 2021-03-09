import express from 'express';
import { sqlInstance } from '../../index.js';
import {checkOwner, checkToken} from '../security/security.js';

export const routes = express.Router();

// Method DELETE for a group
/**
 * @swagger
 *
 * /groups/{id}:
 *   delete:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Delete a group from the database if the user is the owner
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
 *            example:
 *              token: string
 *              id: string
 *     responses:
 *      '204':
 *        description: DELETED
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 */
routes.delete('/groups/:id', async (request, response) => {
  const params = request.body;

  if (!params.token || !params.id) {
    response.status(400);
    response.send('Bad parameters').end();
    return;
  }

  const properToken = await checkToken(params.token, params.id);
  if(!properToken){
    response.status(403);
    response.send('Wrong token').end();
    return;
  }

  const userOwner = await checkOwner(params.id, request.params.id);
  if(!userOwner){
    response.status(403);
    response.send('User is not the owner').end();
    return;
  }
  try {
    // Delete users_groups
    await sqlInstance.request('DELETE FROM USERS_GROUPS WHERE `GROUP` = ?', [request.params.id]);
    // Delete group
    sqlInstance.request('DELETE FROM GROUPS WHERE ID = ?', [request.params.id]).then(result => {
      response.status(204);
      response.send('').end();
    });
  } catch (err) {
    throw new Error(err);
  }

});