import {GroupsApi} from "./userGroups/UserGroupsApi";
import {UserGroupsApi} from "./groups/GroupsApi";
import {UsersApi} from "./users/UsersApi";

const Api = {
  GroupsApi: GroupsApi,
  UserGroupsApi: UserGroupsApi,
  UsersApi: UsersApi,
}

export default Api;
