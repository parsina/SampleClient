import {Injectable} from '@angular/core';

@Injectable()
export class DataStorage
{

  constructor()
  {
  }

  signOut()
  {
    window.sessionStorage.removeItem('userData');
    window.sessionStorage.clear();
  }

  public saveData(data: any)
  {
    window.sessionStorage.removeItem('userData');
    window.sessionStorage.setItem('userData', JSON.stringify({userId: data.id, username: data.username, email:data.email, userRole: data.role, userInfo: data.info, token: data.token}));
  }

  public getJsonData(): any
  {
    return window.sessionStorage.getItem('userData') === null ? null : JSON.parse(window.sessionStorage.getItem('userData'));
  }

  public getStringData(): any
  {
    return window.sessionStorage.getItem('userData');
  }
}
