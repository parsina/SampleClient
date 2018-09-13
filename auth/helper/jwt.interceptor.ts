import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataStorage} from '../data.storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
  constructor(private dataStorage: DataStorage)
  {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {

    // add authorization header with jwt token if available
    let data = this.dataStorage.getJsonData();
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
