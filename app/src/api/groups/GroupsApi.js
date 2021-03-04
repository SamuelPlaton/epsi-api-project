import {clientGroup} from '../client';
import {setIncludes} from "../helpers";
import {Group} from "../../entities";

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
    get: (id: string, includes?: Array<string>) => clientGroup.get(`/groups/${id}`, setIncludes(includes)).then(response => setGroup(response.data[0])),

    list: (ids: Array<string>) => clientGroup.get(`/groups?ids=${ids.join(',')}`).then(response => {
        return response.data.map(group => setGroup(group));
    }),

    post: (groupData: NewGroupData) => clientGroup.post('/groups', {data: groupData}).then(response => {
        console.log(response);
    }),
    modify: (id: string, groupData: ModifyGroupData) => clientGroup.put(`/groups/${id}`, {data: groupData}).then(response => {
        console.log(response);
    }),
    delete: (id: string, groupData: ModifyGroupData) => clientGroup.delete(`/groups/${id}`, {data: groupData}).then(response => {
        console.log(response);
    }),
}

export default GroupsApi;
