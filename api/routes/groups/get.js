import { sqlInstance } from '../../index.js';
import express from 'express';

export const routes = express.Router();

/**
 * @swagger
 *
 * /groups/{id}:
 *   get:
 *     tags:
 *       - groups
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a group
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            users:
 *              type: string
 *            example:
 *              users: string
 *     responses:
 *      '200':
 *        description: Array containing the group and the users affiliated
 */
routes.get('/groups/:id',  async (request, response) => {
  const includes = request.body;
  // Prepare our results arrays
  const userGroupRes = [];
  const userRes = [];
  let groupRes;
  // Retrieve our group
  groupRes = await sqlInstance.request('SELECT * FROM BUDGET_GROUPS WHERE ID = ?', [request.params.id]).then(async result => {
    // If user included, retrieve their ids for later
    if (includes.users) {
       await sqlInstance.request('SELECT * FROM USERS_GROUPS WHERE ID_GROUP = ?', request.params.id).then(async usersGroups => {
        usersGroups.map( userGroup => {
          userGroupRes.push(userGroup);
        })
      });
    }
    // return our group result
    return result[0];
  });
  // If user retrieve settled
  if(includes.users){
    await sqlInstance.request('SELECT U.ID, U.FIRSTNAME, U.LASTNAME, U.GENDER, U.EMAIL, U.REGISTER_DATE, U.PHONE FROM USERS U WHERE U.ID IN (?)',
      [userGroupRes.map(userGroup => userGroup.id_user)]).then( user => {
        // Retrieve his group
      const userGroup = userGroupRes.find(element => user[0].ID === element.id_user);
      // If user exist, add him to our list
      if(user[0] && userGroup){
        userRes.push({...user[0], ROLE: userGroup.role, MONEY: userGroup.money });
      }
    })
  }

  response.send({
    group: groupRes,
    users: userRes,
  }).end();
});
