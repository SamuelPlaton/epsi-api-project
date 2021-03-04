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
  const params = request.body;
  if(!params.id || !params.token || !params.budget || !params.title || !params.description || !params.budget ){
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  // Token check
  const properToken = await checkToken(params.token, params.id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }
  const properOwner = await checkOwner(params.id, request.params.id);
  if(!properOwner){
    response.send('Not owner');
    response.status(403).end();
    return;
  }

  const sql = "UPDATE BUDGET_GROUPS SET TITLE = ?, DESCRIPTION = ?, BUDGET = ? WHERE ID = ?";
  sqlInstance.request(sql,
    [
      params.title,
      params.description,
      params.budget,
      request.params.id]).then(result => {
    response.send("");
    response.status(200).end();
  });
});