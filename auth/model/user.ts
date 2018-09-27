export class User 
{
  id: number;
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
  
  constructor(user : User)
  {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.repeatedPassword = user.repeatedPassword;
  }
}
