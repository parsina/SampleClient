export class User 
{
  id: number;
  username: string;
  password: string;
  repeatedPassword: string;
  
  constructor(user : User)
  {
    this.username = user.username;
    this.password = user.password;
    this.repeatedPassword = user.repeatedPassword;
  }
}