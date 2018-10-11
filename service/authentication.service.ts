import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../auth/model/user';
import {Observable} from 'rxjs';
import {DataStorage} from '../auth/data.storage';

@Injectable({providedIn: 'root'})
export class AuthenticationService
{
  constructor(private http: HttpClient, private dataStorage: DataStorage)
  {
  }

  isUserLoggedIn():boolean
  {
    return this.dataStorage.getUserStringData() != null;
  }

  getLoggedInUser(stringType:boolean):any
  {
    return stringType ? this.dataStorage.getUserStringData() : this.dataStorage.getUserJsonData();
  }

  getLoggedInUserAccount(stringType:boolean):any
  {
    return stringType ? this.dataStorage.getUserAccountStringData() : this.dataStorage.getUserAccountJsonData();
  }

  checkRoleAccessibility(role:string):boolean
  {
    let userData = this.dataStorage.getUserJsonData();

    if(userData != null && userData.userId != null)
    {
      if (role === 'ADMIN' && userData.userRole === 'ROLE_ADMIN')
        return true;
      if (role === 'USER_ADMIN' && (userData.userRole === 'ROLE_ADMIN' || userData.userRole === 'ROLE_USER') )
        return true;
    }
    return false;
  }

  login(user: User)
  {
    return this.http.post<any>('//localhost:8090/auth/login/', {username: user.username, password: user.password});
  }

  logout()
  {
    this.http.post('//localhost:8090/auth/logout/', {user: this.dataStorage.getUserJsonData()});
    this.dataStorage.signOut();
  }
}
