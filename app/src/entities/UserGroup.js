export const Role = {
  guest: 'guest',
  admin: 'admin',
}


export interface UserGroup {
  id: string;

  attributes: {
    money: number,
    role: Role,
    token?: string,
  };

  relationships: {
    group: string,
    user: string
  };
}
