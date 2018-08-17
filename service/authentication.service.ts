import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../auth/model/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
  constructor(private http: HttpClient)
  {
  }

  login(user: User)
  {
    return this.http.post<any>('//localhost:8090/api/authenticate/', {username: user.username, password: user.password});
  }

  logout()
  {
    this.http.post<any>('//localhost:8090/api/logout/', {user: sessionStorage.getItem('currentUser')});
    sessionStorage.removeItem('currentUser');
  }
}
