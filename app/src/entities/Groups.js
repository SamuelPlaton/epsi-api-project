export interface Users {
  id: string;

  attributes: {
    title: string,
    description: string,
    budget: number,
    code: string,
    registerDate: string
  };

  relationships: {
    User_Groups: Array<string>
  };
}
