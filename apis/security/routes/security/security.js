import { sqlInstance } from '../../index.js';

export async function checkToken(token, id) {
  return await sqlInstance.request('SELECT * FROM USERS WHERE TOKEN = ? AND ID = ?', [token, id]).then(result => {
    return result.length > 0;
  });
}

export async function checkOwner(id_user, id_group) {
  return await sqlInstance.request('SELECT * FROM USERS_GROUPS WHERE ID_USER = ? AND ID_GROUP = ? AND ROLE = "owner"', [id_user, id_group]).then(result => {
    return result.length > 0;
  });
}