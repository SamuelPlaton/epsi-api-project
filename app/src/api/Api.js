import {default as UserGroupsApi} from "./userGroups/UserGroupsApi";
import {default as GroupsApi} from "./groups/GroupsApi";
import {default as UsersApi} from "./users/UsersApi";

const Api = {
  GroupsApi: GroupsApi,
  UsersGroupsApi: UserGroupsApi,
  UsersApi: UsersApi,
}

export default Api;
