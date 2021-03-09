import { sqlInstance } from '../../index.js';
import express from 'express';
import { checkOwner, checkToken } from '../security/security.js';

export const routes = express.Router();

/**
 * @swagger
 *
 * /groups/{id}:
 *   put:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Update group by the owner
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
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            budget:
 *              type: float
 *            example:
 *              id: user Id
 *              userToken: user Token
 *              budget: float
 *              title: string
 *              description: string
 *     responses:
 *      '200':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.put('/groups/:id', async (request, response) => {
  const {id, token, title, description, budget} = request.body.data;
  if( !request.body.data || !id || !token || !title || !description || !budget ){
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
  const properOwner = await checkOwner(id, request.params.id);
  if(!properOwner){
    response.status(403);
    response.send('Not owner').end();
    return;
  }

  const sql = "UPDATE GROUPS SET TITLE = ?, DESCRIPTION = ?, BUDGET = ? WHERE ID = ?";
  sqlInstance.request(sql,
    [
      title,
      description,
      budget,
      request.params.id]).then(result => {
    response.status(200);
    response.send("").end();
  });
});