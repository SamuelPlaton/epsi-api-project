import { sqlInstance } from '../../index.js';

export async function checkToken(token, id) {
  return await sqlInstance.request('SELECT * FROM USERS_GROUPS WHERE TOKEN = ? AND USER = ?', [token, id]).then(result => {
    return result.length > 0;
  });
}

export async function checkCode(code) {
  return await sqlInstance.request('SELECT * FROM GROUPS WHERE CODE = ?', [code.toString()]).then(result => {
    return result.length > 0;
  });
}

export async function checkOwner(id_user, id_group) {
  return await sqlInstance.request('SELECT * FROM USERS_GROUPS WHERE USER = ? AND GROUP = ? AND ROLE = "admin"', [id_user, id_group]).then(result => {
    return result.length > 0;
  });
}