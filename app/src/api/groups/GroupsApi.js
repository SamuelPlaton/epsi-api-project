import {clientGroup} from '../client';
import {setIncludes} from "../helpers";
import {Group} from "../../entities";
import {setUsersGroups} from "../usersGroups";

export interface NewGroupData {
    id: number,
    token: string,
    title: string,
    description: string,
    budget: number,
}

export interface ModifyGroupData {
    id: number,
    token: string,
    title: string,
    description: string,
    budget: number,

}

export const setGroup = (group: Object): Group => {
    return {
        id: group["ID"],
        attributes: {
            title: group["TITLE"],
            description: group["DESCRIPTION"],
            budget: group["BUDGET"],
            code: group["CODE"]
        },
        relationships: {
            UsersGroups: group["USERS_GROUPS"],
        }
    };
}

const GroupsApi = {
    get: (id: string, includes?: Array<string>) => clientGroup.get(`/groups/${id}`, setIncludes(includes)).then(response => {
        const group = setGroup(response.data['group'][0]);
        let usersGroups = []
        if(response.data['users']){
            usersGroups = response.data['users'].map(user => setUsersGroups(user));
        }
        return {group, usersGroups};
    }),

    list: (ids: Array<string>) => clientGroup.get(`/groups?ids=${ids.join(',')}`).then(response => {
        const groups = response.data;
        if(groups !== -1){
            return groups.map(group => setGroup(group));
        }
        return [];
    }),

    post: (groupData: NewGroupData) => clientGroup.post('/groups', {data: groupData}).then(response => {
        return response.data;
    }),
    modify: (id: string, groupData: ModifyGroupData) => clientGroup.put(`/groups/${id}`, {data: groupData}).then(response => {
        return response.data;
    }),
    delete: (id: string, idUser: string, token: string) => clientGroup.delete(`/groups/${id}`, { data: {token: token, id: idUser}}).then(response => {
        return response.data;
    }),
}

export default GroupsApi;
