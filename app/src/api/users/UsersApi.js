import { clientSecurity } from '../client';
import {setIncludes} from "../helpers";
import {User} from "../../entities";

export interface NewUsersData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export interface ModifyUsersData {
  firstName: string,
  lastName: string,
  email: string,
}

export const setUsers = (users: Object): User => {
  return {id: users['id'], attributes: {
      firstName: users['firstname'],
      lastName: users['lastname'],
      email: users['email'],
      token: users['token'],
  },
  };
}

const UsersApi = {
  get: (id: string, includes?: Array<string>) => clientSecurity.get(`/users/${id}`, setIncludes(includes)).then(response => setUsers(response.data[0])),

  list: (ids: Array<string>) => clientSecurity.get(`/users?ids=${ids.join(',')}`).then(response => {
    return response.data.map(u => setUsers(u));
  }),

  post: (usersData: NewUsersData) => clientSecurity.post('/users', {data: usersData}).then(response => {
    if(response.data === -1){
      return -1
    }
    return setUsers(response.data);
  }),
  login: (email: string, password: string) => clientSecurity.post('/users/login', {data: {email: email, password: password}}).then(response => {
    if(response.data['id']){
      return setUsers(response.data);
    }
    return undefined;
  }),
  modify: (id: string, usersData: ModifyUsersData) => clientSecurity.put(`/users/${id}`, {data: usersData}).then(response => {
    console.log(response);
  })
}

export default UsersApi;
