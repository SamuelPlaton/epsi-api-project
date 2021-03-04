export const Role = {
  guest: 'guest',
  admin: 'admin',
}


export interface Users {
  id: string;

  attributes: {
    user: string,
    money: number,
    role: Role,
    token?: string,
  };

  relationships: {
    groups: Array<string>
  };
}
