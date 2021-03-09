import express from 'express';
import cryptoJS from 'crypto-js';
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
 *            email:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              firstName: string
 *              lastName: string
 *              email: string
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
  const params = request.body.data;
  if ( !params || !params.firstName || !params.lastName || !params.email || !params.token) {
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

  // Check if email or phone already exist
  const emailExist = await sqlInstance.request('SELECT * FROM USERS WHERE EMAIL = ? AND ID != ?', [params.email, request.params.id]).then(result => {
    return result.length > 0;
  });
  if(emailExist ){
    response.status(403);
    response.send('-1').end();
    return;
  }

  // Update our user
  const sql = 'UPDATE USERS SET FIRSTNAME = ?, LASTNAME = ?, EMAIL = ? WHERE ID = ?';
  sqlInstance.request(sql,
      [
        params.firstName,
        params.lastName,
        params.email,
        request.params.id]).then(result => {
    response.status(200);
    response.send({
      id: request.params.id,
      firstname: params.firstName,
      lastname: params.lastName,
      email: params.email,
      token: params.token
    }).end();

  });
});

// Method PUT to modify a password user
/**
 * @swagger
 *
 * /users/password/:id:
 *   put:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Update a user password to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            previousPassword:
 *              type: string
 *            newPassword:
 *            token:
 *              type: string
 *            example:
 *              previousPassword: string
 *              newPassword: string
 *              token: string
 *     responses:
 *      '200':
 *        description: Password Updated
 *     '400':
 *        description: Bad parameters
 *     '403':
 *        description: Unauthorized
 *
 */
routes.put('/users/password/:id', async (request, response) => {
  const {previousPassword, newPassword, token} = request.body.data;
  if ( !request.body.data || !previousPassword || !newPassword || !token) {
    response.status(400);
    response.send('Bad parameters').end();
    return;
  }

  const properToken = await checkToken(token, request.params.id);
  if (!properToken) {
    response.status(403);
    response.send('Wrong token').end();
    return;
  }

  // Encrypt old password and compare it to token
  const pwdToToken = cryptoJS.AES.encrypt(previousPassword, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41');
  const pwd = cryptoJS.AES.decrypt(pwdToToken, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Decrypt DB Token
  const tokenToPwd = cryptoJS.AES.decrypt(token, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  if (pwd !== tokenToPwd) {
    response.status(403);
    response.send('Wrong previous password').end();
    return;
  }
  // Crypt new password
  const newToken = cryptoJS.AES.encrypt(newPassword, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  // Update our user
  const sql = 'UPDATE USERS SET TOKEN = ? WHERE ID = ?';
  sqlInstance.request(sql,
      [
        newToken,
        request.params.id]).then(result => {
    response.status(200);

    response.send(newToken).end();
  });
});
