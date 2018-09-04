export interface Creds {
  emailAddress: string;
  password: string;
}

export interface IUser {
  displayName?: string;
  uid: string;
  email: string;
}

export class User implements IUser {
  constructor(
    public uid: string,
    public email: string,
    public displayName?: string
  ) {}
}
