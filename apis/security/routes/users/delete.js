import express from 'express';
import { sqlInstance } from '../../index.js';
import { checkToken } from '../security/security.js';

export const routes = express.Router();

// Method DELETE for a user
/**
 * @swagger
 *
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Delete a user from the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            token:
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
routes.delete('/users/:id', async (request, response) => {
  const params = request.body;

  if (!params.token) {
    response.status(400);
    response.send('Bad parameters').end();
    return;
  }

  const properToken = await checkToken(params.token, request.params.id);
  if(!properToken){
    response.status(403);
    response.send('Wrong token').end();
    return;
  }

  try {
    // Delete user
    sqlInstance.request('DELETE FROM USERS WHERE ID = ?', [request.params.id]).then(result => {
      response.status(204);
      response.send('').end();
    });
  } catch (err) {
    throw new Error(err);
  }

});