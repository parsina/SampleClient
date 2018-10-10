import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {DataStorage} from '../data.storage';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
  constructor(private router: Router, private dataStorage: DataStorage)
  {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    let userData = this.dataStorage.getJsonData();
    if (userData != null && userData.userId != null)
    {
      if(state.url == '/account' && (userData.userRole === 'ROLE_USER' || userData.userRole === 'ROLE_ADMIN'))
        return true;
      if(state.url == '/administrator' && userData.userRole === 'ROLE_ADMIN')
        return true
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
