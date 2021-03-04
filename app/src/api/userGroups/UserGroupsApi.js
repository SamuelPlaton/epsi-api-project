import { clientGroup } from '../client';
import {setIncludes} from "../helpers";
import {UserGroup} from "../../entities";
import {Role} from "../../entities/UserGroup";

export interface ModifyUserGroupData {
  user: string,
  money: number,
  role: Role,
  token?: string,
}

export const setUsersGroups = (userGroup: Object): UserGroup => {
  return {id: userGroup["ID"],
    attributes: {
      user: userGroup["USER"],
      money: userGroup["MONEY"],
      role: userGroup["ROLE"],
      token: userGroup["TOKEN"],
    },
    relationships:{
      user: userGroup["USER"],
      group: userGroup["GROUP"]
    }
  };
}

const UsersGroupsApi = {
  getByUser: (id: string) => clientGroup.get(`/usersGroups/user/${id}`).then(response => {
    const users: Array = response.data;
    return  users.map(us => setUsersGroups(us));
  }),

  getByGroup: (id: string) => clientGroup.get(`/usersGroups/group/${id}`).then(response => {
    return response.data.map(us => setUsersGroups(us));
  }),

  post: (id: string, token: string, code: string) => clientGroup.post(`/usersGroups`, {data: { code: code, id: id, token: token}}).then(response => {
    console.log(response);
    return response.data;
  }),
  modify: (id: string, userGroupData: ModifyUserGroupData) => clientGroup.put(`/usersGroups/${id}`, {data: userGroupData}).then(response => {
    console.log(response);
  })
}

export default UsersGroupsApi;
