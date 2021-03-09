import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cryptoJS from 'crypto-js';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();

//Method POST for a user
/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Add a user to the database
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
 *            password:
 *              type: string
 *            phone:
 *              type: string
 *            example:
 *              firstName: string
 *              lastName: string
 *              email: string
 *              password: string
 *              phone: string optional
 *     responses:
 *      '201':
 *        description: Posted
 *      '403':
 *        description: Email or phone already exist
 *
 */
routes.post('/users', async (request, response) => {
  const params = request.body.data;
  const uuid = uuidv4();

  if ( !params || !params.firstName || !params.lastName || !params.email || !params.password ) {
    response.status(400);
    response.send('Bad parameters').end();
    return;
  }
  // Crypt password
  const token = cryptoJS.AES.encrypt(params.password, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  // Check if email or phone already exist
  const emailExist = await sqlInstance.request('SELECT * FROM USERS WHERE EMAIL = ?', [params.email]).then(result => {
    return result.length > 0;
  });
  if(emailExist){
    response.status(403);
    response.send('-1').end();
    return;
  }

  // Insert our user
  const sql = 'INSERT INTO USERS(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN) VALUES(?, ?, ?, ?, ?)';
  sqlInstance.request(sql,
    [uuid,
      params.firstName,
      params.lastName,
      params.email,
      token]).then(result => {
    response.status(201);
    response.send({
      id: uuid,
      firstname: params.firstName,
      lastname: params.lastName,
      email: params.email,
      token: token
    }).end();

  });

});

// Method POST for a user login
/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Login a user
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            example:
 *              email: string
 *              password: string
 *     responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong email or password
 */
routes.post('/users/login', async (request, response) => {
  const params = request.body.data;

  if (!params || !params.email || !params.password) {
    response.status(400);
    response.send('-1').end();
    return;
  }
  // Retrieve token if the email is found
  const userResult = await sqlInstance.request("SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1",
    [params.email]).then(result => {
    return result;
  });
  if (userResult.length === 0) {
    response.status(403);
    response.send('-2').end();
    return;
  }

  // Encrypt then decrypt password
  const pwdToToken = cryptoJS.AES.encrypt(params.password, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41');
  const pwd = cryptoJS.AES.decrypt(pwdToToken, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Decrypt DB Token
  const tokenToPwd = cryptoJS.AES.decrypt(userResult[0]['token'], '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Handle connexion success or failure
  if(pwd === tokenToPwd){
    response.status(200);
    response.send(userResult[0]).end();
  }else{
    response.status(403);
    response.send('-3').end();
  }
});