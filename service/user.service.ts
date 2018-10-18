import {User} from '../auth/model/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService
{

  constructor(private http: HttpClient)
  {
  }

  register(user: User)
  {
    return this.http.post(`//localhost:8090/auth/signUp/`, {username: user.username, email:user.email, pass: user.password, reppass: user.repeatedPassword});
  }

  sendActivationEmail(email: string)
  {
    return this.http.post(`//localhost:8090/auth/sendActivationLink/`, {'email': email});
  }

  confirmRegistration(token: string)
  {
    return this.http.post(`//localhost:8090/auth/confirmActivationToken/`, {'token': token});
  }

  getUserAccount():Observable<any>
  {
    return this.http.get(`//localhost:8090/account/userAccount/`);
  }
}
