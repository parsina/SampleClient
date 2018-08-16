import {User} from '../auth/model/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

@Injectable({providedIn: 'root'})
export class UserService
{

  constructor(private http: HttpClient)
  {
  }

  getAll()
  {
//        return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  getById(id: number)
  {
//        return this.http.get(`${config.apiUrl}/users/` + id);
  }

  register(user: User)
  {
    return this.http.post(`//localhost:8090/api/register/`, {username: user.username, pass: user.password, reppass: user.repeatedPassword});
  }

  sendActivationEmail(email: string)
  {
    return this.http.post(`//localhost:8090/api/sendActivationLink/`, {'email': email});
  }

  confirmRegistration(token: string)
  {
    return this.http.post(`//localhost:8090/api/confirm/`, {'token': token});
  }

  update(user: User)
  {
//        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
  }

  delete(id: number)
  {
//        return this.http.delete(`${config.apiUrl}/users/` + id);
  }
}
