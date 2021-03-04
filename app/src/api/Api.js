import {default as GroupsApi} from "./userGroups/UserGroupsApi";
import {default as UserGroupsApi} from "./groups/GroupsApi";
import {default as UsersApi} from "./users/UsersApi";

const Api = {
  GroupsApi: GroupsApi,
  UsersGroupsApi: UserGroupsApi,
  UsersApi: UsersApi,
}

export default Api;
