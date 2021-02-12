import express from 'express';
import { sqlInstance } from '../../index.js';
import { checkToken } from '../security/security.js';

export const routes = express.Router();

// Method PUT to modify a user
/**
 * @swagger
 *
 * /users/:id:
 *   put:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Update a user to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            gender:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              firstName: string
 *              lastName: string
 *              gender: male of female or other
 *              email: string
 *              phone: string
 *              token: string
 *     responses:
 *      '200':
 *        description: Updated
 *     '400':
 *        description: Bad parameters
 *     '403':
 *        description: Unauthorized
 *
 */
routes.put('/users/:id', async (request, response) => {
  const params = request.body;
  if (!params.firstName || !params.lastName || !params.gender || !params.email || !params.token) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  const properToken = await checkToken(params.token, request.params.id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // Update our user
  const sql = 'UPDATE USERS SET FIRSTNAME = ?, LASTNAME = ?, GENDER = ?, EMAIL = ?, PHONE = ? WHERE ID = ?';
  sqlInstance.request(sql,
    [
      params.firstName,
      params.lastName,
      params.gender,
      params.email,
      params.phone,
      request.params.id]).then(result => {
    response.send('');
    response.status(200).end();
  });
});

// todo: method to change a password