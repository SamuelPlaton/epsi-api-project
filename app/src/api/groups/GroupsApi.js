import { clientgroup } from '../client/clientGroup';
import {setIncludes} from "../helpers";
import type {Groups} from "@/entities";

export interface NewGroupData {
    title: string,
    description: string,
    budget: number,
}

export interface ModifyGroupData {
    title: string,
    description: string,
    budget: number,

}

export const setGroup = (groups: Object): Groups => {
  return {id: groups.id,
      attributes: {
          title: groups.title,
          description: groups.description,
          budget: groups.budget,
  },
    relationships:{
        User_Groups: groups.User_Groups,
    }
  };
}

const GroupsApi = {
  get: (id: string, includes?: Array<string>) => clientgroup.get(`/groups/${id}`, setIncludes(includes)).then(response => setGroup(response.data[0])),

  post: (groupData: NewGroupData) => clientgroup.post('/groups', {data: groupData}).then(response => {
    console.log(response);
  }),
  modify: (id: string, groupData: ModifyGroupData) => clientgroup.put(`/groups/${id}`, {data: groupData}).then(response => {
    console.log(response);
  }),
    delete:(id: string, groupData: ModifyGroupData) => clientgroup.delete(`/groups/${id}`, {data: groupData}).then(response => {
        console.log(response);
    }),
}

export default GroupsApi;
