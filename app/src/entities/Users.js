export interface Users {
  id: string;

  attributes: {
    firstName: string,
    lastName: string,
    email: string,
    token?: string,
    registerDate: string
  };

}
