import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataStorage} from '../data.storage';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
  constructor(private dataStorage: DataStorage, private auth:AuthenticationService)
  {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    this.auth.showLoader();

    // add authorization header with jwt token if available
    let data = this.dataStorage.getUserJsonData();
    if (data && data.token)
    {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${data.token}`
        }
      });
    }

    return next.handle(request);
  }
}
