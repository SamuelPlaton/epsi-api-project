import { clientsecurity } from '../client/clientsecurity';
import {setIncludes} from "../helpers";
import type { Users } from "@/entities";

export interface NewUsersData {
  firstName: string,
  lastName: string,
  email: string,
  token?: string,
  registerDate: string
}

export interface ModifyUsersData {
  firstName: string,
  lastName: string,
  email: string,
  token?: string,
  registerDate: Date
}

export const setUsers = (users: Object): Users => {
  return {id: users.id, attributes: {
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      token: users.token,
      registerDate: users.registerDate,
  },

  };
}

const UsersApi = {
  get: (id: string, includes?: Array<string>) => clientsecurity.get(`/users/${id}`, setIncludes(includes)).then(response => setUsers(response.data[0])),

  post: (usersData: NewUsersData) => clientsecurity.post('/users', {data: usersData}).then(response => {
    console.log(response);
  }),
  modify: (id: string, usersData: ModifyUsersData) => clientsecurity.put(`/users/${id}`, {data: usersData}).then(response => {
    console.log(response);
  })
}

export default UsersApi;
