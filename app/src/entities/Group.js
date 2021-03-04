export interface Group {
  id: string;

  attributes: {
    title: string,
    description: string,
    budget: number,
    code: string
  };

  relationships: {
    UsersGroups: Array<string>
  };
}
