export interface User {
  id: string;

  attributes: {
    firstName: string,
    lastName: string,
    email: string,
    token?: string
  };

}
