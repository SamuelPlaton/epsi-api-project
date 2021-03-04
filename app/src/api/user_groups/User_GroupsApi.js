import { clientgroup } from '../client/clientGroup';
import {setIncludes} from "../helpers";
import type {Users_Groups} from "@/entities";
import {Role} from "@/entities/User_Group";

export interface NewUsers_GroupsData {
    user: string,
    money: number,
    role: Role,
    token?: string,
}

export interface ModifyUsers_GroupsData {
  user: string,
  money: number,
  role: Role,
  token?: string,
}

export const setUsers_Groups = (users_groups: Object): Users_Groups => {
  return {id: users_groups.id,
    attributes: {
      user: users_groups.user,
      money: users_groups.money,
      role: users_groups.role,
      token: users_groups.token,
    },
    relationships:{
      User_Groups: users_groups.User_Groups,
    }
  };
}

const Users_GroupsApi = {
  get: (id: string, includes?: Array<string>) => clientgroup.get(`/usersGroups/${id}`, setIncludes(includes)).then(response => setUsers_Groups(response.data[0])),

  post: (users_groupsData: NewUsers_GroupsData) => clientgroup.post('/usersGroups', {data: users_groupsData}).then(response => {
    console.log(response);
  }),
  modify: (id: string, users_groupsData: ModifyUsers_GroupsData) => clientgroup.put(`/usersGroups/${id}`, {data: users_groupsData}).then(response => {
    console.log(response);
  })
}

export default Users_GroupsApi;
