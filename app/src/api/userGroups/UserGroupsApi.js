import { clientGroup } from '../client';
import {setIncludes} from "../helpers";
import {UserGroup} from "../../entities";
import {Role} from "../../entities/UserGroup";

export interface NewUserGroupData {
    user: string,
    money: number,
    role: Role,
    token?: string,
}

export interface ModifyUserGroupData {
  user: string,
  money: number,
  role: Role,
  token?: string,
}

export const setUsersGroups = (userGroup: Object): UserGroup => {
  return {id: userGroup.id,
    attributes: {
      user: userGroup.user,
      money: userGroup.money,
      role: userGroup.role,
      token: userGroup.token,
    },
    relationships:{
      User_Groups: userGroup.User_Groups,
    }
  };
}

const UsersGroupsApi = {
  get: (id: string, includes?: Array<string>) => clientGroup.get(`/usersGroups/${id}`, setIncludes(includes)).then(response => setUsersGroups(response.data[0])),

  post: (userGroupData: NewUserGroupData) => clientGroup.post('/usersGroups', {data: userGroupData}).then(response => {
    console.log(response);
  }),
  modify: (id: string, userGroupData: ModifyUserGroupData) => clientGroup.put(`/usersGroups/${id}`, {data: userGroupData}).then(response => {
    console.log(response);
  })
}

export default UsersGroupsApi;
