import { clientSecurity } from '../client/clientSecurity';
import {setIncludes} from "../helpers";
import type { Users } from "@/entities";

export interface NewUsersData {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface ModifyUsersData {
  firstName: string,
  lastName: string,
  email: string,
}

export const setUsers = (users: Object): Users => {
  return {id: users.id, attributes: {
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
  },

  };
}

const UsersApi = {
  get: (id: string, includes?: Array<string>) => clientSecurity.get(`/users/${id}`, setIncludes(includes)).then(response => setUsers(response.data[0])),

  post: (usersData: NewUsersData) => clientSecurity.post('/users', {data: usersData}).then(response => {
    console.log(response);
    return setUser(response.data);
  }),
  modify: (id: string, usersData: ModifyUsersData) => clientSecurity.put(`/users/${id}`, {data: usersData}).then(response => {
    console.log(response);
  })
}

export default UsersApi;
